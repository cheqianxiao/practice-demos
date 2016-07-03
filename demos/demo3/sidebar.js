(function(){
	var Menubar = function(){
		this.el = document.querySelector('#sidebar ul');
		this.state = "allClosed";
		this.menuList = document.querySelectorAll('#sidebar ul li');
		var self  =this;
		this.currentOpenedMenuContent = null;
		for(var i =0;i<this.menuList.length;i++){
			this.menuList[i].addEventListener('click',function(e){//菜单项的打开和关闭
				var menuContentEl = document.getElementById(e.target.id+"-content");
				if(self.state === "allClosed"){
					menuContentEl.className ="nav-content";
            menuContentEl.classList.add("menuContentEl-move-right");
                  	self.state ="hasOpened";
                  	self.currentOpenedMenuContent = menuContentEl;
				}else {
					self.currentOpenedMenuContent.className = "nav-content";
					self.currentOpenedMenuContent.classList.add("menuContentEl-move-left");
					self.state ="hasOpened";
                  	self.currentOpenedMenuContent = menuContentEl;
                  	menuContentEl.className = "nav-content";
                  	menuContentEl.classList.add("menuContentEl-move-top");
				}


			})
		}
		this.menuContentList = document.querySelectorAll('.nav-content > div.nav-con-close');
		for(var i = 0; i < this.menuContentList.length; i++){//点击内容项的按钮关闭相关内容项
			this.menuContentList[i].addEventListener("click",function(e){
				var menuContent = e.currentTarget.parentNode;
				menuContent.className = "nav-content";
          		menuContent.classList.add("menuContentEl-move-left");
          		self.state = "allClosed"
          		self.currentOpenedMenuContent = null;
			})
		}
	}
	var Sidebar = function(eId,closebarId){

		this.state = "opened";
		this.el = document.getElementById(eId||"sidebar");
		this.closebar = document.getElementById(closebarId||"closebar");
		var self = this;
		this.menubar = new Menubar();//生成sidebar对象的时候就生成了menubar对象，并成为了sidebar对象的属性
		this.closebar.addEventListener('click',function(){//sidebar的打开和关闭
          self.switch();
		})

	}
	Sidebar.prototype.close = function(){
		if(this.menubar.state == "hasOpened"){
			this.menubar.currentOpenedMenuContent.querySelector('div.nav-con-close').click();
		}
		this.el.className = "sidebar-move-left";
		this.closebar.className = "closebar-move-right";
		this.state = "closed";


	}
	Sidebar.prototype.open = function(){
		this.el.className = "sidebar-move-right";
		this.closebar.className = "closebar-move-left";
		this.state = "opened";

	}
	Sidebar.prototype.switch = function(){
        this.state === "opened"?this.close():this.open();
	}
	var sidebar = new Sidebar();


})()