var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d')
autoCanvasSize(yyy)
listenToUser(yyy)



black.onclick=function(){
    context.fillStyle = 'black'
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    purple.classList.remove('active')
    blue.classList.remove('active')
    green.classList.remove('active')
}

red.onclick=function(){
    context.fillStyle = 'red'
    context.strokeStyle = 'red'
    red.classList.add('active')
    black.classList.remove('active')
    purple.classList.remove('active')
    blue.classList.remove('active')
    green.classList.remove('active')
}

purple.onclick=function(){
    context.fillStyle = 'purple'
    context.strokeStyle = 'purple'
    purple.classList.add('active')
    black.classList.remove('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    green.classList.remove('active')
}

blue.onclick=function(){
    context.fillStyle = 'blue'
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    black.classList.remove('active')
    red.classList.remove('active')
    purple.classList.remove('active')
    green.classList.remove('active')
}
 
green.onclick=function(){
    context.fillStyle = 'green'
    context.strokeStyle = 'green'
    green.classList.add('active')
    black.classList.remove('active')
    red.classList.remove('active')
    purple.classList.remove('active')
    blue.classList.remove('active')
}


var eraserEnable = false
eraser.onclick = function () {
    eraserEnable = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
pen.onclick = function () {
    eraserEnable = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}


//监听用户函数
function listenToUser(canvas) {
    var using = false;
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    var newPoint = {
        x: undefined,
        y: undefined
    }
    //特性检测
    //手机
    if (document.body.ontouchstart !== undefined) {
        //点击屏幕
        canvas.ontouchstart = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            using = true
            if (eraserEnable) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    x: x,
                    y: y
                }
            }
        }
        //滑动屏幕
        canvas.ontouchmove = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            if (!using) {
                return
            }
            if (eraserEnable) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                newPoint = {
                    x: x,
                    y: y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        //结束触屏
        canvas.ontouchend = function (aaa) {
            using = false
        }

        //电脑
    } else {
        //按下鼠标
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnable) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    x: x,
                    y: y
                }
            }
        }
        //移动鼠标
        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            if (!using) {
                return
            }
            if (eraserEnable) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                newPoint = {
                    x: x,
                    y: y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }

        }
        //松开鼠标
        canvas.onmouseup = function (aaa) {
            using = false
        }
    }
}

//自动调整宽高
function autoCanvasSize(canvas) {
    //取得页面宽高
    setCanvasSize()
    //取得调整后的页面宽高
    window.onresize = function () {
        setCanvasSize()
    }
    //取得页面宽高函数
    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

//画圆
function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    
    context.fill()
}
//画线
function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineWidth = 5
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath()
}