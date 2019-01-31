const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth ;
canvas.height = window.innerHeight;

let A,B,player;
let moveToA = false;
let distance = 0;

function setUp(){
  A = {};
  A.pos = new Vector2d(100,500);
  A.vel = new Vector2d(0,0);
  A.point = new Point(A.pos.dx,A.pos.dy,20,"limegreen");

  B = {};
  B.pos = new Vector2d(1000,200);
  B.vel = new Vector2d(0,0);
  B.point = new Point(B.pos.dx,B.pos.dy,20,"limegreen");

  player = {};
  player.pos = new Vector2d((B.pos.dx + A.pos.dx)/2,(B.pos.dy + A.pos.dy)/2);
  player.vel = new Vector2d(0,0);
  player.acc = new Vector2d(0,0);
  player.point = new Point(player.pos.dx,player.pos.dy,10,"blue");

  animate();
}

function animate(){
  requestAnimationFrame(animate);
  // context.clearRect(0,0,1000,1000);
  context.fillStyle = "rgb(255,255,255)";
  context.fillRect(0,0,canvas.width,canvas.height);

  context.beginPath();
  context.strokeStyle = "black";
  context.setLineDash([6, 10]);
  context.moveTo(A.pos.dx,A.pos.dy);
  context.lineTo(B.pos.dx,B.pos.dy);
  context.closePath();
  context.stroke();
  context.setLineDash([0]);

  A.pos.add(A.vel);
  A.point.position(A.pos);
  A.point.draw(context);

  B.pos.add(B.vel);
  B.point.position(B.pos);
  B.point.draw(context);

  player.vel.add(player.acc);
  player.pos.add(player.vel);
  player.point.position(player.pos);
  player.point.draw(context);

  if(moveToA){
    distance = player.point.distanceToOtherPoint(A.point);
    player.vel.differenceVector(A.pos,player.pos);
    if(player.point.distanceToOtherPoint(A.point)<A.point.r + player.point.r){
      moveToA = false;
    }
  } else {
    distance = player.point.distanceToOtherPoint(B.point);
    player.vel.differenceVector(B.pos,player.pos);
    if(player.point.distanceToOtherPoint(B.point)<A.point.r + player.point.r){
      moveToA = true;
    }
  }

  player.vel.magnitude = 10;


}

setUp();
