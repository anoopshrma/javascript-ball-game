var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
// var time=document.querySelector('h4');
// var time1=0;
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}
function Shape(x, y, velX, velY,exist) {
//   assiging new coordinates 
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY; 
  this.exist=true;
}
//bouncy balls main function works over here
function Ball(x,y,velX,velY,exist,size,color)
{
	Shape.call(this,x,y,velX,velY,exist);
	this.size=size;
	this.color=color;
}
Ball.prototype=Object.create(Shape.prototype);
Ball.prototype.constructor=Ball;


//making ball shape
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();

}
//checks for boundary conditions
Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }
  if(true){
  this.x += this.velX;
  this.y += this.velY;

}
}
//chexks for collision between balls.
Ball.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
}


//Evil CIrcle
function evilCircle(x,y,exist){
	Shape.call(this,x,y,exist);
	this.velX=20;
	this.velY=20;
	this.size=10;
	this.color='white';

}


//Evil CIrcle
function evilCircle2(x,y,exist){
	Shape.call(this,x,y,exist);
	this.velX=20;
	this.velY=20;
	this.size=10;
	this.color='white';

}
evilCircle.prototype=Object.create(Shape.prototype);
evilCircle.prototype.constructor=evilCircle;
//Making Evil ball
evilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.lineWidth=3;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
}
//checks for the Bounds
evilCircle.prototype.checkBounds = function() 
{
  if ((this.x + this.size) >= width) {
    this.x-=this.size;
  }

  if ((this.x - this.size) <= 0) {
    this.x+=this.size;
  }

  if ((this.y + this.size) >= height) {
    this.y-=this.size;
  }

  if ((this.y - this.size) <= 0) {
    this.y+=this.size;
  }

}
//for manually controlling the evil circle
evilCircle.prototype.setControl=function()
{    var _this = this;
    window.onkeydown = function(e) {
    if (e.keyCode === 65) {
      _this.x -= _this.velX;
      time1--;
    } else if (e.keyCode === 68) {
      _this.x += _this.velX;
    } else if (e.keyCode === 87) {
      _this.y -= _this.velY;
    } else if (e.keyCode === 83) {
      _this.y += _this.velY;
    }

  }


}
var para=document.querySelector('p');
var count=0;
//checking for collision , if found any evilCircle will eat the bouncy ball
evilCircle.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (balls[j].exist) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exist=false;
        count--;
        para.textContent='Ball count:'+count;
      }
    }
  }
}
var evil = new evilCircle(random(0,width), random(0,height), true);
evil.setControl();

var balls = [];
//loop to develop balls.
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  //ctx.fillRect(0, 0, width, height);

  while (balls.length < 25) {
    var ball = new Ball(
      random(0,width),
      random(0,height),
      random(-7,7),
      random(-7,7),
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      random(10,20)
    );
    balls.push(ball);
    count++;
    //time1=3600;
    para.textContent='Ball count:'+count;
  }

  for (var i = 0; i < balls.length; i++) {
  	if(balls[i].exist){
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
    
  }}
  //time1--;
   evil.draw();
  evil.checkBounds();
  evil.collisionDetect();
  requestAnimationFrame(loop);
}
loop();

