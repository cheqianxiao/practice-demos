(function($) {
  var LightBox = function() {
    var self = this;
    this.popupMask = $('<div id="lightbox-mask">');
    this.popupWin = $('<div id="lightbox-popup">');
    this.bodyNode = $(document.body);
    this.renderDom();

    this.picViewArea = this.popupWin.find("div.lightbox-pic-view"); //图片预览区域
    this.popupPic = this.popupWin.find("img.lightbox-img"); //图片
    this.picCaptionArea = this.picViewArea.find("div.lightbox-pic-caption"); //描述区域
    this.picCaptionDesc = this.picViewArea.find("div.lightbox-pic-desc"); //描述文字
    this.nextBtn = this.popupWin.find("span.lightbox-next-btn"); //下一个按钮
    this.prevBtn = this.popupWin.find("span.lightbox-prev-btn"); //上一个按钮
    this.currentIndex = this.popupWin.find("em.lightbox-index"); //索引
    this.closeBtn = this.popupWin.find("div.lightbox-close-btn"); //关闭按钮

    this.groupName = ""; //记录当前的组别名称
    this.groupData = [];
    this.bodyNode.delegate(".js-lightbox,*[data-role=lightbox]", 'click', function(e) {
      var currentGroupName = $(this).attr('data-group');
      if (currentGroupName != self.groupName) {
        self.groupName = currentGroupName;
        self.getGroup(); //找到这一组的所有图片
      }
      self.initPopup($(this));

    });
    this.picViewArea.hover(function() {
        self.picCaptionArea.fadeIn();
      }, function() {
        self.picCaptionArea.fadeOut();
      });
    this.popupMask.click(function() {
      $(this).fadeOut();
      self.popupWin.fadeOut();
    });
    this.closeBtn.click(function() {
      self.popupMask.fadeOut();
      self.popupWin.fadeOut();
    });
    this.nextBtn.hover(function() {
      if (!$(this).hasClass("disabled")) {
        $(this).addClass("lightbox-next-btn-show")
      }
    }, function() {
      if ($(this).hasClass("lightbox-next-btn-show")) {
        $(this).removeClass('lightbox-next-btn-show');
      }
    }).click(function() {
      self.goto("next");
    });
    this.prevBtn.hover(function() {
      if (!$(this).hasClass("disabled")) {
        $(this).addClass("lightbox-prev-btn-show");
      }
    }, function() {
      if ($(this).hasClass("lightbox-prev-btn-show")) {
        $(this).removeClass('lightbox-prev-btn-show');
      }
    }).click(function() {
      self.goto("prev");
    });
  }
  LightBox.prototype.goto = function(dir) {
    var self = this;
    var src = "";
    if (dir == "next") {
      this.index++;
      if (this.index == this.groupData.length - 1) {//最后一张
        this.nextBtn.removeClass("lightbox-next-btn-show");
      }

    } else if (dir == "prev") {
      this.index--;
      if (this.index == 0) {//第一张
        this.prevBtn.removeClass('lightbox-prev-btn-show');

      }
    }
    src = this.groupData[this.index].src;
    this.loadPicSize(src);

  }
  LightBox.prototype.getIndexOf = function(currentId) {
    for (var i = 0; i < this.groupData.length; i++) {
      if (this.groupData[i].id == currentId) {
        return i;
      }
    }

  }
  LightBox.prototype.changePic = function(picWidth, picHeight) {
    var self = this;
    var self = this,
      winWidth = $(window).width(),
      winHeight = $(window).height();

    //要考虑出现图片尺寸大于窗口尺寸的情况
    var scale = Math.min((winWidth - 10) / picWidth, (winHeight - 10) / picHeight, 1);


    var picWidth = picWidth * scale; 
    var picHeight = picHeight * scale;

    //注意顺序
    this.popupPic.animate({
    	width: picWidth,
    	height: picHeight
    });
    self.picViewArea.animate({
        width: picWidth,
        height: picHeight
      }).fadeIn();
    this.popupWin.animate({
      width: picWidth + 10,
      height: picHeight + 10,
      marginLeft: -(picWidth + 10) / 2,
      top: (winHeight - picHeight - 10) / 2
    });
    
    this.currentIndex.html(this.index + 1 + '/' + this.groupData.length);
    this.picCaptionDesc.html(this.groupData[this.index].caption);
  }
  LightBox.prototype.preLoadImg = function(sourceSrc, callback) {
    var img = new Image();
    if (window.ActiveXObject) {
      img.onreadystatechange = function() {
        if (this.readyState === "complete") {
          callback();
        }
      }
    } else {
      img.onload = function() {
        callback(img.width,img.height);
      }
    }
    img.src = sourceSrc;
  }
  LightBox.prototype.loadPicSize = function(sourceSrc) {

    var self = this;

    this.preLoadImg(sourceSrc, function(picWidth,picHeight) {
      self.popupPic.attr("src", sourceSrc);
      self.changePic(picWidth, picHeight);
    });

    var groupDataLength = this.groupData.length;
    if (groupDataLength > 1) {
      if (this.index === 0) {
        this.prevBtn.addClass("disabled");
      } else if (this.index + 1 === groupDataLength) {
        this.nextBtn.addClass("disabled");
      } else {
        this.prevBtn.removeClass("disabled");
        this.nextBtn.removeClass("disabled");
      }
    } else {
      this.nextBtn.addClass("disabled");
      this.prevBtn.addClass("disabled");
    }

  }
  LightBox.prototype.showMaskAndPopup = function(sourceSrc, currentId) {
      var self = this;

      this.picViewArea.hide();

      this.popupMask.fadeIn();

      var winWidth = $(window).width();
      var winHeight = $(window).height();
   
      this.popupWin.css({
          width: winWidth / 2,
          height: winHeight / 2,
          marginLeft: -winWidth / 4,
          top: -winWidth / 2,
          left: winWidth / 2
        }).fadeIn()
        .animate({
          top: winHeight / 4
        }, function() {
          //加载图片
          self.loadPicSize(sourceSrc);

        });
      this.index = this.getIndexOf(currentId);


    }

    //根据点击的小图 初始化 mask和popup
  LightBox.prototype.initPopup = function(currentObj) {
      sourceSrc = currentObj.attr('data-source');
      currentId = currentObj.attr('data-id');
      this.showMaskAndPopup(sourceSrc, currentId);

    }
    //找到点击图片所在组别的所有图片将相关信息存入groupData
  LightBox.prototype.getGroup = function() {
      var self = this;
      var groupList = this.bodyNode.find("img[data-group=" + this.groupName + "]");
      self.groupData = [];

      groupList.each(function() {
        self.groupData.push({
          src: $(this).attr('data-source'),
          id: $(this).attr('data-id'),
          caption: $(this).attr('data-caption')
        })
      })


    }
    //将html结构组织好
  LightBox.prototype.renderDom = function() {
    var domStr = '<div class="lightbox-pic-view">' +
      '<span class="lightbox-prev-btn lightbox-btn"></span>' +
      '<img src="" alt=""  class="lightbox-img">' +
      '<span class="lightbox-next-btn lightbox-btn"></span>' +
      '<div class="lightbox-close-btn"></div>' +
      '<div class="lightbox-pic-caption">' +
      '<p class="lightbox-pic-desc">这里是描述文字</p>' +
      '<em class="lightbox-index">1/4</em>' +
      '</div>' +
      '</div>';
    this.popupWin.html(domStr);
    this.bodyNode.append(this.popupMask, this.popupWin);
  }

  window.LightBox = LightBox;
})(jQuery)
