var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
$(window).on('mousedown', mouseDown);
$(window).on('mouseup', mouseUp);
$(window).on('mousemove', mouseMove);

var colors = {
  red: '#ff4436',
  green: '#8BC34A',
  blue: '#3F51B5'
}

var objects = [];    
var mousedown = false;
var x = 0, y = 0, radius = 2;
var color = colors.red;
var prevX = -1, prevY = -1;
var object = {};
var pts = [];

$('.color').on('click', function() {
    $('#red').css('border-color', 'transparent');
    $('#green').css('border-color', 'transparent');
    $('#blue').css('border-color', 'transparent');
    color = colors[$(this).attr('id')];
    $(this).css('border-color', '#fafafa');
});

var socket = io();

socket.on('draw', function(obj) {
  var pts = obj.points;
  drawLine(obj.startX, obj.startY, obj.color);
  for(var i = 0; i < pts.length; i ++)
  {
     lines(pts[i].x, pts[i].y);
  } 
  ctx.closePath();
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
      drawLine(prevX, prevY, color);
      lines(x, y);
      ctx.closePath();
      pts.push({x: x, y: y});
      prevX = x;
      prevY = y;

    }
    else if(prevX == -1 && prevY == -1)
    {
      object.startX = x;
      object.startY = y;
      object.color = color;
      prevX = x;
      prevY = y;
    }
}

/* Listener Callbacks */
function mouseDown(e)
{
  mousedown = true;
  x = e.clientX;
  y = e.clientY;
}

function mouseUp(e)
{
    object.points = pts;
    objects.push(object);
    socket.emit('draw', object);
    prevX = -1;
    prevY = -1; 
    object = {};
    pts = [];
    mousedown = false;
}

function mouseMove(e) {     
  if(mousedown)
  {
    draw(e.clientX, e.clientY);
  }
}


/* Drawing components */
function drawLine(prevX, prevY, color)
{
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
}

function lines(x, y)
{
  ctx.lineTo(x, y);
  ctx.stroke();
}

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h, color);
  ctx.fill();
}

