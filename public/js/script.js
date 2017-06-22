var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var colors = {
  red: '#ff4436',
  green: '#8BC34A',
  blue: '#3F51B5'
}

var mousedown = false;
var color = colors.red;
var prevX = -1, prevY = -1;

$(window).on('mousedown', mouseDown);
$(window).on('mouseup', mouseUp);
$(window).on('mousemove', mouseMove);


$(document).ready(function() {

});
$('.color').on('click', function() {
    $('#red').css('border-color', 'transparent');
    $('#green').css('border-color', 'transparent');
    $('#blue').css('border-color', 'transparent');
    color = colors[$(this).attr('id')];
    $(this).css('border-color', '#fafafa');
});

var socket = io();

socket.on('draw', function(obj) {
  drawLine(obj.startX, obj.startY, obj.endX, obj.endY, obj.color);
});

/* Init */
(function() {
    canvas.width = $(window).width();
    canvas.height = 555;
    drawRect(0, 0, canvas.width, canvas.height, '#1A1C1D');
})();
    
function draw(x, y)
{   
    if(prevX != -1 && prevY != -1)
    {
        drawLine(prevX, prevY, x, y, color);
        socket.emit('draw', {startX: prevX, startY: prevY, endX: x, endY: y, color: color});
    }
    prevX = x;
    prevY = y;
}

/* Listener Callbacks */
function mouseDown(e)
{
  mousedown = true;
}

function mouseUp(e)
{
    prevX = -1;
    prevY = -1;
    mousedown = false;
}

function mouseMove(e) {     
  if(mousedown)
  {
    draw(e.clientX, e.clientY);
  }
}


/* Drawing components */
function drawLine(prevX, prevY, x, y, color)
{
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(x, y);
  ctx.stroke();
}

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h, color);
  ctx.fill();
}

