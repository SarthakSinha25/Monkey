
var monkey , monkey_running , ground
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var PLAY = 1
var END = 0
var gameState = PLAY



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(669,500);
  
  monkey = createSprite(50,400);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.12;
  
  ground = createSprite(300,480,900,10);
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}


function draw() {
  background ("white");
  textSize(30)
  text("Survival Time:  "+ score, 220,50);
  
  if (gameState === PLAY){
  if (keyWentDown("space") && monkey.y >= 438) {
    monkey.velocityY = -20;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  spawnFood();
  spawnRock();
  survivalTime();  
    
  if (monkey.isTouching(FoodGroup)) {
    FoodGroup.destroyEach();
  }
    
    if (monkey.isTouching(obstacleGroup)) {
    FoodGroup.destroyEach();
    gameState = END;  
  }
    
 }
  if (gameState === END) {
    monkey.velocityY = 0;
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
  }
  drawSprites();
}

function spawnFood() {
  
  if (frameCount % 130 === 0){
  var food = createSprite(600,120,40,10);
  food.y = Math.round(random(200,280));
  food.addImage("foodz",bananaImage);
  food.velocityX = -7  
  food.scale = 0.15;
  FoodGroup.add(food);  
  }
}
function spawnRock() {
  
  if (frameCount % 180 === 0){
  var rock = createSprite(600,430,40,10);
  rock.addImage("rockz",obstacleImage);
  rock.velocityX = -7  
  rock.scale = 0.25;
  obstacleGroup.add(rock);
      rock.debug = true;
    rock.setCollider("circle",30,0)
  }
}
function survivalTime(){
if (frameCount % 35 === 0) {
  score = score +1;
}

}
