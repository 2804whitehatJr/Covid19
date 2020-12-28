var background1, backgroundImg;
var cloud, cloudImg,  cloudsGroup;
var ground;
var girl, girlImg;
var sanitizer, mask, vaccine, cureGroup;
var score;
var PLAY=1,gameState=1, END=0;
var obstacleGroup, obstacleImg;

function preload()
{
  backgroundImg=loadImage("background.jpg");
    cloudImg=loadImage("cloud-1.png");
  
  cloudImg= loadImage("cloud-1.png");
  
  girlImg= loadAnimation( 'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/littleGirl/run00.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/littleGirl/run01.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/littleGirl/run02.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/littleGirl/run03.png')
  
  sanitizer= loadImage("sanitizer.png");
  
  mask= loadImage("mask.png");
  
  vaccine= loadImage("injection.png");
  
  obstacleImg= loadImage("obstacle.png");
}

function setup()
{
  createCanvas(600,600);
  
  background1=createSprite(200,200);
  background1.addImage("background",backgroundImg);
  background1.scale=0.3;
  
  
  ground=createSprite(225,490, 800,30);
  ground.shapeColor="brown";
  
  girl= createSprite(359,20,40,40);
    girl= createSprite(70,450,20,20);
 girl.addAnimation("running",girlImg);
  girl.scale=1.7;
  girl.x=70;

  //girl.debug=true
  girl.setCollider( "rectangle", 0, 0,20,50)
   
   cloudsGroup= new Group();
    cureGroup= new Group();
  obstacleGroup= new Group();
  
  score=0;
}

function draw()
{
  
  if(gameState===PLAY)
    {
     ground.velocityX=2;
    if (ground.x > 0)
    {
     ground.x =ground.width/2;
      
    }
        
      if(girl.isTouching(cureGroup))
        {
          score= score+5;
          cureGroup.destroyEach();
        }
    
  if(keyDown("space") && girl.y>345)
  {
    girl.velocityY=-13;  
  }
  girl.velocityY=girl.velocityY+0.5;

    
  if(girl.isTouching(obstacleGroup))
    {
      
     gameState=END; 
  
    }

 girl.collide(ground);
    }
  
  else if(gameState===END)
    {
      if(girl.isTouching(obstacleGroup))
        {
          textSize(30)
          fill("red");
          text("Game Over", 200,200);
      
      cloudGroup.destroy();
      cureGroup.destroy();
      obstacleGroup.destroy();
        }
      
    }
  
  spawnClouds();
  spawnCure();
  corona();
  drawSprites();
  
    fill("red");
  textSize(30);
 strokeWeight(50);
   text("Score: " +score,40,30);
 
}

function spawnClouds()
{
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) 
  {
    cloud=createSprite(600,700,20,20);
    cloud.y = Math.round(random(height-300,height-500));
    cloud.addImage("cloud",cloudImg);
    cloud.scale=0.1;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
   // cloud.depth = girl.depth;
    //girl.depth = girl.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  
  }
}


function spawnCure() {
  if(frameCount % 60 === 0) 
  {
    var cure = createSprite(600,195,5,5);
    //obstacle.debug = true;
  
    cure.velocityX = -5;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: cure.addImage(sanitizer);
              break;
      case 2: cure.addImage(mask);
              break;
      case 3: cure.addImage(vaccine);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    cure.scale = 0.1;
    cure.lifetime = 300;
    //add each obstacle to the group
    cureGroup.add(cure);
  }
}

function corona(){
  if (frameCount%200===0)
  {
    var corona;
    corona=createSprite(600,445,10,40);
    //corona.debug=true
    corona.lifetime=300;
    corona.addAnimation("corona",obstacleImg);
    corona.scale=0.2;
   corona.velocityX=-2;
    obstacleGroup.add(corona)
  }
}
