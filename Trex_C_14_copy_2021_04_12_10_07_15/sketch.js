var GameOver
var Restart
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var Gver
var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var GSound
var CSound
var JSound

var score=0
var og ,  cg 
var gameState = "play"

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  Gver = loadImage("gameOver.png")
  Rstart = loadImage("restart.png")
  
  GSound = loadSound("die.mp3")
  CSound = loadSound("checkPoint.mp3")
  JSound = loadSound("jump.mp3")
  
  
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  GameOver = createSprite(300,100,10,10)
  GameOver.addImage("gameOver", Gver)
  GameOver.scale = 0.75
  GameOver.visible = false;
  
  Restart = createSprite(300,150,50,50)
  Restart.addImage("reStart", Rstart)
  Restart.scale = 0.75
  Restart.visible = false;
  
  
 
  og = new Group()
  cg = new Group()
 
}

function draw() {
  background(180);
  
  if(gameState==="play"){
    score = score + Math.round(getFrameRate()/60)
      
 if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -13;
   
JSound.play()  

   
  }
     trex.velocityY = trex.velocityY + 0.8
    
    
    if(score %100 ===0&& score >0){
    
  CSound.play()
       

}
    
    
     if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
     //spawn the clouds
  spawnClouds();
  
  //spawn obstacles on the ground
  spawnObstacles();
    
 if (trex.isTouching(og)) {
   gameState= "end"
   GSound.play()
 } 
    
    
  }

       
  else{
    ground.velocityX = 0
    og.setVelocityXEach(0)
    og.setLifetimeEach(-1)
    cg.setVelocityXEach(0)
    cg.setLifetimeEach(-1)
    trex.changeAnimation("collided" , trex_collided)
    GameOver.visible = true;
    Restart.visible = true;
    trex.velocityY = 0
   
    
    if(mousePressedOver(Restart)){
      gameState = "play"
      og.destroyEach()
      cg.destroyEach()
      GameOver.visible = false;
      Restart.visible = false;
      trex.changeAnimation ("running" , trex_running)
      score = 0
      
      
      
    }
      
      
      
      
      
      
      
  
  }
  
  
  trex.setCollider("circle", 0,0,50)

  text("Score : " + score , 450,30)
  
  trex.collide(invisibleGround);
  
 
                           
 
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -6;

   
    // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   og.add(obstacle)
 }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cg.add(cloud)
  }
  
}



