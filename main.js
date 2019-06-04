var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d')
autoCanvasSize(yyy)
listenToMouse(yyy)

var eraserEnable = false
eraser.onclick = function() {
  eraserEnable = true
  actions.className ="actions x"
}
brush.onclick = function(){
  eraserEnable =false
  actions.className ="actions " 
}




function listenToMouse(canvas) {
  var using = false;
  var lastPoint = {
    x: undefined,
    y: undefined
  }
  var newPoint = {
    x: undefined,
    y: undefined
  }
  canvas.onmousedown = function(aaa) {
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
  canvas.onmousemove = function(aaa) {
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
  canvas.onmouseup = function(aaa) {
    using = false
  }

}


function autoCanvasSize(canvas) {
  setCanvasSize()
  window.onresize = function() {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}


function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fillStyle = 'black'
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineWidth = 5
  context.lineTo(x2, y2);
  context.strokeStyle = 'black'
  context.stroke();
  context.closePath()
}