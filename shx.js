//运动
function doMove ( obj, attr, dir, target, endFn ) {
	dir = parseInt(getStyle( obj, attr )) < target ? dir : -dir;
	clearInterval( obj.timer );
	obj.timer = setInterval(function () {
		var speed = parseInt(getStyle( obj, attr )) + dir;
		if ( speed > target && dir > 0 ||  speed < target && dir < 0  ) {
			speed = target;
		}
		obj.style[attr] = speed + 'px';
		if ( speed == target ) {
			clearInterval( obj.timer );
			endFn && endFn();
		}
	}, 30);
}

//抖动
function shake(obj,attr) {
    if(obj.onOff) return;
    obj.onOff = true;
    var pos = parseInt(getStyle(obj,attr));
    var arr = [];
    var num = 0;
    var timer = null;
    for(var i=20;i>0;i-=2){
        arr.push(i,-i);
    }
    arr.push(0);
    clearInterval(obj.shake);
    obj.shake = setInterval(function () {
        obj.style[attr] = pos + arr[num] + 'px';
        num++;
        if(num===arr.length){
            clearInterval(obj.shake);
            obj.onOff = false;
        }
    },50)
}

//补齐两位
function toTwo ( n ) {
    return n < 10 ?  '0' + n : '' + n;
}

//获取绝对位置  getBoundingClientRect();
function getPos(obj) {
    var pos = {left:0, top:0};
    while (obj) {
        pos.left += obj.offsetLeft;
        pos.top += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return pos;
}

//获取style
function getStyle ( obj, attr ) { return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr]; }

//获取class
function getElementsByClassName(oParent, tagName, className) {
    var aEls = oParent.getElementsByTagName(tagName);
    var arr = [];
    for (var i=0; i<aEls.length; i++) {
        var arrClassName = aEls[i].className.split(' ');
        for (var j=0; j<arrClassName.length; j++) {
            if ( arrClassName[j] == className ) {
                arr.push(aEls[i]);
                break;
            }
        }
    }
    return arr;
}

//添加class
function addClass(obj, className) {
    if (obj.className == '') {
        obj.className = className;
    } else {
        var arrClassName = obj.className.split(' ');
        if ( arrIndexOf(arrClassName, className) == -1 ) {
            obj.className += ' ' + className;
            /*arrClassName.push(className);
             obj.className = arrClassName.join(' ');*/
        }
    }
}

//移除class
function removeClass(obj, className) {
    if (obj.className != '') {
        var arrClassName = obj.className.split(' ');
        var _index = arrIndexOf(arrClassName, className);
        if ( _index != -1 ) {
            arrClassName.splice(_index, 1);
            obj.className = arrClassName.join(' ');
        }
    }
}

function arrIndexOf(arr, v) {
    for (var i=0; i<arr.length; i++) {
        if (arr[i] == v) {
            return i;
        }
    }
    return -1;
}

//事件绑定
function bind(obj,evname,fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evname,fn,false);
    } else {
        obj.attachEvent('on'+evname,function () {
            fn.call(obj);
        });
    }
}

//拖拽
function drag(obj) {
    obj.onmousedown = function(ev) {
        var ev = ev || event;
        var disX = ev.clientX - this.offsetLeft;
        var disY = ev.clientY - this.offsetTop;

        if ( obj.setCapture ) {
            obj.setCapture();
        }
        document.onmousemove = function(ev) {
            var ev = ev || event;
            var L = ev.clientX -disX;
            var T = ev.clientY -disY;
            if (L<0) {
                L = 0;
            } else if (L>document.documentElement.clientWidth-obj.offsetWidth) {
                L = document.documentElement.clientWidth-obj.offsetWidth;
            }
            if (T<0) {
                T = 0;
            } else if (T>document.documentElement.clientHeight-obj.offsetHeight) {
                T = document.documentElement.clientHeight-obj.offsetHeight;
            }
            obj.style.left = L + 'px';
            obj.style.top = T + 'px';
        };
        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
            if ( obj.releaseCapture ) {
                obj.releaseCapture();
            }
        };
        return false;
    }
}

//设置cookie
function setCookie(key, value, t) {
    var oDate = new Date();
    oDate.setDate( oDate.getDate() + t );
    document.cookie = key + '=' + value + ';expires=' + oDate.toGMTString();
}

//读取cookie
function getCookie(key) {
    var arr1 = document.cookie.split('; ');
    for (var i = 0; i < arr1.length; i++) {
        var arr2 = arr1[i].split('=');
        if (arr2[0]==key) {
            return decodeURI(arr2[1]);
        }
    }
}

//删除cookie
function removeCookie(key) {
    setCookie(key,'',-1);
}