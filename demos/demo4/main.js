window.onload = function(){
	imgLocation("container","box_img");
	var imgData = {data: [{"src":"http://placehold.it/300x250"},{"src":"http://placehold.it/300x550"},{"src":"http://placehold.it/300x350"},{"src":"http://placehold.it/300x250"},{"src":"http://placehold.it/300x150"},{"src":"http://placehold.it/300x100"}]}
	window.onscroll = function(){
        if(checkFlag("container","box_img")){
        	var container = document.getElementById("container");
        	for(var i = 0;i < imgData.data.length;i++){//模拟加载图片
        		var box_img = document.createElement("div");
        		box_img.className = "box_img";
        		container.appendChild(box_img);
        		var img = document.createElement("img");
        		img.src = imgData.data[i].src;
        		box_img.appendChild(img);
        	}
        }
        imgLocation("container","box_img");
	}
}
function checkFlag(parent,child){
	var container = document.getElementById(parent);
	var childArr = document.getElementsByClassName(child);
	var lastImg = childArr[childArr.length - 1];
	var lastTop = lastImg.offsetTop;
	var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
	var screenHeight = document.documentElement.clientHeight||document.body.clientHeight;
	if(lastTop < scrollTop + screenHeight){
		return true;
	}

}
function imgLocation(parent,child){
	var container = document.getElementById(parent);
	var childArr = document.getElementsByClassName(child);
	var boxWidth = childArr[0].offsetWidth;//所有图片等宽
	var screenWidth = document.body.clientWidth||document.documentElement.clientWidth;
	var num = Math.floor(screenWidth/boxWidth);//窗口中一排可放盒子的数量
	container.style.width = num * boxWidth +"px";
	container.style.margin ="0 auto";
	var boxHeightArr = [];//所有小盒子的高度组成的数组
	for(var i = 0;i<childArr.length;i++){
		if(i<num){
			boxHeightArr[i] = childArr[i].offsetHeight;	
		}else{//从第二排开始就要做判断 来决定到底放哪
			 var minHeight = Math.min.apply(null,boxHeightArr);//获取数组中最小值的方法
			 var index = getMinHeightIndex(boxHeightArr,minHeight);
			 childArr[i].style.position = "absolute";
			 childArr[i].style.top = minHeight + "px";
			 childArr[i].style.left = childArr[index].offsetLeft + "px";
			 boxHeightArr[index] += childArr[i].offsetHeight;
			//更新那个index对应的高度
		}
		
	}
   
}
function getMinHeightIndex(boxHeightArr,minHeight){
	for(var i = 0;i<boxHeightArr.length;i++){
		if(boxHeightArr[i] === minHeight){
			return i;
		}
	}

}