var monkey, monkey_running, monkeyStopping;
var banana, bananaImage;
var obstacle, obstacleImage;
var foodGroup, obstaclesGroup;
var score, bananasEaten;
var bg, bgImage;
var ground, groundImage;
var invisibleGround;
var PLAY = 1;
var END = 0;
var gameState = 1;


function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  monkeyStopping = loadImage("sprite_0.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  bgImage = loadImage("background-2.jpg");

  groundImage = loadImage("rope.png");

}



function setup() {
  score = 0;
  bananasEaten = 0;

  createCanvas(600, 200);

  foodGroup = createGroup();
  obstaclesGroup = createGroup();

  bg = createSprite(300, 100, 20, 20);
  bg.addImage("bg", bgImage);

  ground = createSprite(300, 150, 600, 10);
  ground.addImage("ground", groundImage);
  ground.scale = 0.3;
  ground.velocityX = -(5 + 3 * score / 100);

  invisibleGround = createSprite(300, 150, 600, 10);
  invisibleGround.visible = false;

  monkey = createSprite(100, 120, 20, 20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;




}


function draw() {
  background("black");

  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);
    if (monkey.isTouching(foodGroup)) {
      foodGroup.destroyEach();
      bananasEaten = bananasEaten + 1;
    }
    if (ground.x < 100) {
      ground.x = ground.width / 30;
    }
    obstacles();
  bananas();
    if (monkey.isTouching(obstaclesGroup)) {
      gameState = END;

    }






  }

  if (gameState === END) {
    monkey.addImage("monkey", monkeyStopping);
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    ground.velocityX = 0;

    monkey.velocityY = 0;

    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);

  }

  if (keyDown("space") && monkey.y > 110) {
    monkey.velocityY = -10;
  }
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(invisibleGround);

  

  drawSprites();

  fill(rgb(76, 0, 247));
  text("Survival Time: " + score + " seconds", 150, 55);
  text("Bananas Eaten: " + bananasEaten, 380, 55);
}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 130, 20, 20);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.velocityX = -5
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
    obstaclesGroup.add(obstacle);
  }
}

function bananas() {
  if (frameCount % 100 === 0) {
    banana = createSprite(600, Math.round(random(102, 5)), 20, 20);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 200;
    foodGroup.add(banana);

  }

}