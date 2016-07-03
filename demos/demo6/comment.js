window.onload = function() {
    var list = document.getElementById("list");
    var lis = list.children;

    function removeNode(node) {
        node.parentNode.removeChild(node);
    }

    function praiseBox(box, el) {
        var praiseElement = box.getElementsByClassName("praises-total")[0];
        var oldTotal = parseInt(praiseElement.getAttribute("total"));
        var txt = el.innerHTML;
        var newTotal;
        if (txt == "赞") {
            newTotal = oldTotal + 1;
            praiseElement.innerHTML = newTotal == 1 ? "我觉得很赞" : "我和" + oldTotal + "个人觉得很赞";
            el.innerHTML = "取消赞";
        }
        if (txt == "取消赞") {
            newTotal = oldTotal - 1;
            praiseElement.innerHTML = newTotal == 0 ? "" : newTotal + "个人觉得很赞";
            el.innerHTML = "赞";
        }
        praiseElement.setAttribute("total", newTotal);
        praiseElement.style.display = newTotal == 0 ? "none" : "block";
    }
    // 发表评论
    function replayBox(box) {
        var textarea = box.getElementsByTagName('textarea')[0];
        var list = box.getElementsByClassName("comment-list")[0];
        var li = document.createElement("li");
        li.className = "comment-box clearfix";
        li.setAttribute("user", "self");
        var str = 
            '<img class="myhead" src="images/my.jpg" alt="">' +
            ' <div class="comment-content">' +
            '<p class="comment-text"><span class="user">我：</span>'+textarea.value+'</p>' +
            '<p class="comment-time">' +
            getTime() +
            '<a href="" class="comment-praise" total="0" my="0">赞</a>' +
            '<a href="" class="comment-operate">删除</a>' + '</p></div>';
       li.innerHTML = str;
       list.appendChild(li);
       textarea.value = "";
       textarea.onblur();


    }
    function getTime(){
    	var t = new Date();
    	var y  = t.getFullYear();
    	var m = t.getMonth()+1;
    	var d = t.getDate();
    	var h = t.getHours();
    	var mi = t.getMinutes();
    	y = y<10?"0"+y:y;
    	m = m<10?"0"+m:m;
    	d = d<10?"0"+d:d;
    	h = h<10?"0"+h:h;
    	mi = mi<10?"0"+mi:mi;
    	return y+"-"+m+"-"+d+" "+h+":"+mi;
    }
    // 赞回复
    function praiseReply(el){
        var oldTotal = parseInt(el.getAttribute("total"));
        var my = parseInt(el.getAttribute("my"));
        var newTotal;
        if(my === 0){
          newTotal = oldTotal+1;
          el.setAttribute("my","1");

          el.innerHTML = newTotal + " 取消赞";
        }else {
        	newTotal = oldTotal - 1;
        	el.setAttribute("my","0");
        	el.innerHTML = (newTotal==0)? " 赞":newTotal+ " 赞";

        }
        el.setAttribute("total",newTotal);
        el.style.display = newTotal==0?'':'inline-block';
    }
    // 操作回复，对自己的回复可以删除，对别人的回复可以写回复
    function operateReply(box,el){
        var textarea = box.getElementsByTagName("textarea")[0];//分享
        var commentBox = el.parentNode.parentNode.parentNode;//评论
        var user = commentBox.getElementsByClassName("user")[0];
        var txt = el.innerHTML;
        if(txt === "回复"){
        	textarea.onfocus();
        	textarea.value = "回复"+user.innerHTML;
        	textarea.onkeyup();
        }else {
        	removeNode(commentBox);
        }
    }
    for (var i = 0; i < lis.length; i++) {
        lis[i].onclick = function(e) {
                e = e || window.event;
                var target = e.srcElement || e.target;
                var cls = target.className;
                switch (cls) {
                    case "close":
                        removeNode(this);
                        break;
                    case "praise":
                        praiseBox(this, target);
                        break;
                    case "btn btn-off":
                        clearTimeout(timer);
                        break;
                    case "btn":
                        replayBox(this);
                        break;
                    case "comment-praise":
                        praiseReply(target);
                        break;
                    case "comment-operate":
                        operateReply(this,target);
                    default:
                        break;

                }

            }
            // 输入框
        var textarea = lis[i].getElementsByTagName("textarea")[0];
        textarea.onfocus = function() {
            this.parentNode.className = "text-box text-box-on";
            this.value = this.value === "评论..." ? "" : this.value;
            this.onkeyup();
        }
        textarea.onblur = function() {
            var self = this;
            if (this.value === "") {
                timer = setTimeout(function() {
                    self.value = "评论...";
                    self.parentNode.className = "text-box";
                }, 400);
                // 失去焦点后等400ms再变小

            }

        }
        textarea.onkeyup = function() {
            var len = this.value.length;
            var p = this.parentNode;
            var btn = p.children[1];
            var word = p.children[2];
            if (len === 0 || len > 140) {
                btn.className = "btn btn-off";

            } else {
                btn.className = "btn";

            }
            word.innerHTML = len + "/140";
        }
    }

}
