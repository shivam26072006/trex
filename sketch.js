var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex,treximg, trexcol;
var ground,groundimg,ground2;
var clouds,cloundsimg;
var  obstaclesGroup, obstical , obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var cloudsGroup,cloud, cloudImage;
var score = 0,highscore = 0 ;

var jumpSound , ScoreSound, dieSound ;


function preload(){
  treximg = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundimg = loadImage("ground2.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
    cloudImage = loadImage("cloud.png"); 
  
   trexcol = loadAnimation("trex_collided.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  ScoreSound = loadSound("checkPoint.mp3")

restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")

  
}

function setup(){

 createCanvas(600,200);
 trex = createSprite(50,150,20,20)
 trex.addAnimation("run",treximg);
 trex.scale = 0.5;
  trex.addAnimation("col",trexcol);
  
 ground = createSprite(300,170,600,5);
 ground.addImage(groundimg);
 
   
 ground2 = createSprite(50,180,100,5);
  
   gameOver = createSprite(300,50);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5 ;
  
  restart = createSprite(300,80);
  restart.addImage(restartImg);
  restart.scale = 0.5 ;
  
  obstaclesGroup = createGroup();
   cloudsGroup = createGroup();
}


function draw(){
  background("black");
  fill("white");
  text("Score: "+ score, 500,30);
  text("highscore: "+highscore,380,30);
  if(score>highscore){
     highscore = score;
     }
  else{
    highscore = highscore;
  }
  
  if(gameState === PLAY){
    
    ground.velocityX = -(5+score/100);
    
    gameOver.visible = false
    restart.visible = false
    
    score = score + Math.round(getFrameRate()/60);
    
     if (ground.x < 0){
      ground.x = ground.width/2;
    }
    console.log(trex.y);
  if(keyDown("space") && trex.y>153){
    trex.velocityY = -10
    jumpSound.play();
    
    
  }
  
   trex.velocityY = trex.velocityY +0.5;
   
    if(score>0 && score%100 === 0){
       ScoreSound.play() ;
    }
    
   spawnobsticals();
   spawnClouds() ;
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
       dieSound.play();
      
    }
    
    
  }
  
   else if (gameState === END) {
     
      gameOver.visible = true ;
    restart.visible = true ;
     trex.velocityY = 0;
     
     ground.velocityX = 0;
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     
     obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
       trex.changeAnimation("col", trexcol);
     
     if(mousePressedOver(restart)){
       reset();
       
     }
     
   }
  
  ground2.visible = false;
 trex.collide(ground2);
  
  
  
  drawSprites();
  
  
}

function reset(){
  
  gameState = PLAY;
  restart.visible = false;
  gameOver.visible = false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("run",treximg);
  score = 0 ;
  
   
}

function spawnobsticals(){
  
  if(frameCount % 60 == 0){
     
    var obstacle = createSprite(600,155,10,40);
    obstacle.velocityX = -(6+score/100); 
    
    var rand =  Math.round(random(1,6));
    
    switch(rand){
        
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
    }
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
     }
 
}


function spawnClouds() {

   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 270;
    

    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
    
    }
}





