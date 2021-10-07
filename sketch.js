const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

function preload(){
  bg = loadImage("images/background.png")
  fruitimg = loadImage("images/melon.png")
  bunnyimg = loadImage('images/Rabbit-01.png')
  blinkani = loadAnimation('images/blink_1.png','images/blink_2.png','images/blink_3.png')
  eatani = loadAnimation('images/eat_0.png','images/eat_1.png','images/eat_2.png','images/eat_3.png','images/eat_4.png')
  sadani = loadAnimation('images/sad_1.png','images/sad_2.png','images/sad_3.png')
  bgs = loadSound('images/sound1.mp3')
  ss = loadSound('images/sad.wav')
  cs = loadSound('images/rope_cut.mp3')
  es = loadSound('images/eating_sound.mp3')
  ais = loadSound('images/air.wav')
}


function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
  rope = new Rope(5,{x:250,y:30})
  fruit = Bodies.circle(250,50,25)
  World.add(world,fruit)

  blinkani.frameDelay=10
  eatani.frameDelay=100
  eatani.looping=false
  
  sadani.frameDelay = 40
  sadani.looping = false
  bunny = createSprite(320,600)
  bunny.addAnimation('blink',blinkani)
  bunny.addAnimation('eat',eatani)
  bunny.addAnimation('sad',sadani)

  bunny.scale = 0.2
  bgs.play()
  bgs.setVolume(0.1)
  air = createImg('images/balloon.png')
  air.position(10,150)
  air.size(150,100)
  air.mouseClicked(function(){
    Matter.Body.applyForce(fruit,fruit.position,{x:0.01,y:0})
    if(bgs.isPlaying()){
      ais.play()
     } else {
       ais.stop()
     }
  })
  
  mb = createImg('images/mute.png')
  mb.position(450,20)
  mb.size(50,50)
  mb.mouseClicked(function(){
    if(bgs.isPlaying()){
      bgs.stop()
    }else{
      bgs.play()
    }

    
  })
  cut = createImg("images/cut_btn.png")
  cut.position(250,30)
  cut.size(50,50)
  cut.mouseClicked(function(){
    rope.break()
    link.remove()
    if(bgs.isPlaying()){
      cs.play()
     } else {
       cs.stop()
     }
  })
  link=new Link(rope,fruit)
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}


function draw() 
{
  background(bg);
  Engine.update(engine);
  rope.display()
  if(fruit!==null){
   push()
   imageMode(CENTER)
   image(fruitimg,fruit.position.x,fruit.position.y,100,100)
   pop()
  //dist(x1,y1,x2,y2)
  
   if (dist(fruit.position.x,fruit.position.y,bunny.position.x,bunny.position.y)<80){
     bunny.changeAnimation('eat',eatani)
     World.remove(world,fruit)
     fruit = null
     if(bgs.isPlaying()){
      es.play()
     } else {
       es.stop()
     }
     
  }
  }
  if(fruit !== null&&fruit.position.y>650){
    bunny.changeAnimation('sad',sadani)
    if(bgs.isPlaying()){
      ss.play()
     } else {
       ss.stop()
     }
  }
  drawSprites()
}





