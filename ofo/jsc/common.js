

//获取范围随机数 （闭区间）
function randomNum(start,end){
    return Math.floor(Math.random()*(end-start+1))+start;
};




  //获取随机颜色（不支持IE678） 因为rgba是IE9+才支持的
function randomColor(){
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    return "rgb("+r+","+g+","+b+")";//IE7不支出rgb
};


//2.设置非行内样式

function css(obj, attr, value) {
	//对象，样式，值
	if(arguments.length == 2) {
		//arguments参数数组，当参数数组长度为 2的时候获取css样式
		return getStyle(obj, attr);
		//返回对象的非行间样式用getStyle函数

	} else {
		if(arguments.length == 3) {
			//当传入3个值的时候为设置某个值
			obj.Style[attr] = value;
		}
	}

}

//拖拽
//使用方式：
// drag(t,p)
//说明 
//t 表示被拖动的元素
//p 表示拖动点
// 注意：如果省略拖动点，默认可拖动的区域是整个被拖动元素
function drag(t,p){
 
  var point = p || null,
    target = t || null,
    resultX = 0,
    resultY = 0;
 
  (!point)? point = target : ''; //如果没有拖动点，则拖动点默认为整个别拖动元素
 
  function getPos(t){
    var offsetLeft = 0,
      offsetTop = 0,
      offsetParent = t;
 
    while(offsetParent){
      offsetLeft+=offsetParent.offsetLeft;
      offsetTop+=offsetParent.offsetTop;
      offsetParent = offsetParent.offsetParent;
    }
 
    return {'top':offsetTop,'left':offsetLeft};
  }
 
  function core(){
 
    var width = document.body.clientWidth || document.documentElement.clientWidth,
      height = document.body.clientHeight || document.documentElement.clientHeight; 
      maxWidth = width - target.offsetWidth,
      maxHeight = height - target.offsetHeight;
 
    (resultX >= maxWidth)? target.style.left = maxWidth+'px' : (resultX > 0)?target.style.left = resultX +'px': ''; //重置默认位置。
    (resultY >= maxHeight)?  target.style.top = maxHeight +'px' : (resultY > 0)?target.style.top = resultY +'px':''; //重置默认位置。
 
    point.onmousedown=function(e){  
      var e = e || window.event,
        coordX = e.clientX,
        coordY = e.clientY,
        posX = getPos(target).left,
        posY = getPos(target).top;
 
      point.setCapture && point.setCapture();  //将Mouse事件锁定到指定元素上。
      document.onmousemove=function(e){
 
        var ev = e || window.event,
          moveX = ev.clientX,
          moveY = ev.clientY;
 
        resultX = moveX - (coordX - posX); //结果值是坐标点减去被拖动元素距离浏览器左侧的边距
        resultY = moveY - (coordY - posY);
 
        (resultX > 0 )?((resultX < maxWidth)?target.style.left = resultX+'px' : target.style.left = maxWidth+'px') : target.style.left = '0px'; 
        (resultY > 0 )?((resultY < maxHeight)?target.style.top = resultY+'px' : target.style.top = maxHeight+'px') : target.style.top = '0px'; 
 
        ev.stopPropagation && ev.stopPropagation(); 
        ev.preventDefault;
        ev.returnValue = false;
        ev.cancelBubble = true;
      };
    };
    document.onmouseup=function(){  // 解决拖动时，当鼠标指向的DOM对象非拖动点元素时，无法触发拖动点的onmousedown的BUG。
      document.onmousemove = null;  
      point.releaseCapture && point.releaseCapture();  // 将Mouse事件从指定元素上移除。
    };
    point.onmouseup=function(e){
      var e = e || window.event;
      document.onmousemove = null;
      point.releaseCapture && point.releaseCapture();
    };
  }
  core();
  window.onresize = core;  
}

