//gameStates
var PLAY=1;
var END=0;
var gameState = PLAY;

//monkey and its image variable
var monkey , monkey_running;

//banana and obstacle's  images variable
var bananaImage, obstacleImage;

//food and obstacle group 
var foodGroup, obstacleGroup;

//score variable
var score;
var survivalTime;

// ground variable
var ground;



function preload()
{
  //loading monkey's animation
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  //loading banana image
  bananaImage = loadImage("banana.png");
  
  //loading obstacle image
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  //creating canvas
  createCanvas(400,400);
  
  //making monkey sprite and and editing it
  monkey = createSprite(80,307,20,50);
  monkey.addAnimation("monkeyMoving", monkey_running);
  monkey.scale = 0.13;
  monkey.debug = false;
 
  //making groung sprite and making its duplicate
  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  
  //creating group
  foodGroup =  createGroup();
  obstacleGroup =  createGroup();
  
  score = 0;
  
  survivalTime = 0;
}



function draw()
{
 background("lightGrey");
  
  
  
  //makaing score
  stroke("black");
  textSize(20);
  fill("black");
  text("Score:"+score,220,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time:"+survivalTime,50,50);
  
  if(gameState === PLAY)
  {
   //making survial time counter
   
   survivalTime = Math.ceil(frameCount/frameRate());
  
  
   //duplicating ground
   if (ground.x < 0)
    {
      ground.x = ground.width/2;
    }
  
   //making monkey jumping when spacebar is pressed
   if(keyDown("space") && monkey.y >= 110)
   {
    monkey.velocityY = -12; 
   }
    
   //giving gravity to monkey
   monkey.velocityY = monkey.velocityY +0.7;
    
   //spawning obstacles and bananas
   bananas();
   obstacles();
    
   //scoring when monkey is touching banana
   if(foodGroup.isTouching(monkey))
   {
    score = score +2; 
    foodGroup.destroyEach(); 
   } 
    
   if(obstacleGroup.isTouching(monkey))
   {
    gameState = END; 
   } 
  }
  else if(gameState === END)
  {
   monkey.visible = false;
   ground.visible = false;
    
   foodGroup.destroyEach();
   obstacleGroup.destroyEach();
    
   stroke("red");
   textSize(30);
   fill("red");
   text("GAME OVER",115,130); 
    
   stroke("black");
   fill("black");
   textSize(30);
   text("Monkey is dead",100,160); 
    
   stroke("black");
   fill("black");
   textSize(30); 
   text("Press R to Restart",85,250);
    
   if(keyDown("r"))
   {
    reset(); 
   } 
  }
  
  monkey.collide(ground);
  
  drawSprites();
}



function reset()
{
 gameState = PLAY;
 monkey.visible = true;
 ground.visible = true; 
  
 foodGroup.destroyEach();
 obstacleGroup.destroyEach(); 
  
 score = 0;
 frameCount = 0;
}

function bananas()
{
 if(frameCount % 80 === 0)
 {
  //creating banana sprite, spawning it randomly and editing it
  var banana = createSprite(400,120,20,20);
  banana.y = Math.round(random(120,200));
  banana.addImage("banana",bananaImage);
  banana.scale = 0.19;
  banana.lifetime =  120;
  banana.velocityX = -4; 
  //banana.debug = true;
  banana.setCollider("rectangle",0,0,300,300); 
   
  foodGroup.add(banana); 
 }
}



function obstacles()
{
 if(frameCount % 300 === 0)
 {
  var obstacle = createSprite(400,310,20,20);
  obstacle.addImage("obstacle",obstaceImage);
  obstacle.scale = 0.19;
  obstacle.lifetime = 120;
  obstacle.velocityX = -4;
  //obstacle.debug = true;
  obstacle.setCollider("circle",0,0,200); 
   
  obstacleGroup.add(obstacle); 
 } 
}

