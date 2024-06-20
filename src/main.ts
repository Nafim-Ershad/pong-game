import './style.scss';

import { player2AI, respawnBall, vec2 } from './utilities';
import {Ball, Paddle} from "./ObjectClasses";

// const body = document.querySelector<HTMLBodyElement>('body');
const canvas = document.querySelector("#game") as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const startButton = document.querySelector(".start") as HTMLDivElement;
const levelContainer = document.querySelector('#level') as HTMLDivElement;

// Keyboard Key Presses
const keyPressed: boolean[] = [];
let level = 1;

canvas.width = window.screen.width;
canvas.height = window.screen.height - 100;

//  Initializing Game Objects
const ball = new Ball(ctx, vec2(canvas.width / 2, canvas.height / 2), vec2(7, 4), 12);
const player1 = new Paddle(ctx, vec2(0, 0), vec2(5, 5), 20, 100);
const player2 = new Paddle(ctx, vec2(canvas.width - 20, 0), vec2(5, 3), 20, 100);

function ballCollisionWithEdges(ball: Ball): void{
  if(ball.position.y - ball.radius <= 0 || ball.position.y + ball.radius >= canvas.height){
    ball.velocity.y *= -1;
  }
  
  // LEFT and RIGHT edge collision detection for the ball

  // if(ball.position.x - ball.radius <= 0 || ball.position.x + ball.radius >= canvas.width){
  //   ball.velocity.x *= -1;
  // }
}

// Scoring Function
function scoreIncrease(): void{
  if(ball.position.x + ball.radius <= 0)
  {
    player2.score += 1;
    (document.querySelector("#player2score") as HTMLHeadingElement).innerText = `${player2.score}`;
    respawnBall(canvas, ball);
  }

  if(ball.position.x + ball.radius >= canvas.width)
  {
    player1.score += 1;
    (document.querySelector("#player1score") as HTMLHeadingElement).innerText = `${player1.score}`;
    respawnBall(canvas, ball);

    if(player1.score != 0 && player1.score % 5 === 0){
      level += 1;
      levelContainer.innerText = `Level ${level}`;
    }
  }
}



// Collision Calculations
function paddleCollisionWithEdges(paddle: Paddle): void{
  if(paddle.position.y <= 0){
    paddle.position.y = 0;
  }
  if(paddle.position.y + paddle.height >= canvas.height){
    paddle.position.y = canvas.height - paddle.height;
  }
}

function ballAndPaddleCollision(ball: Ball, paddle: Paddle): void{
  let dx = Math.abs(ball.position.x - paddle.getCenter().x);
  let dy = Math.abs(ball.position.y - paddle.getCenter().y);

  if(dx <= (paddle.getHalfWidth() + ball.radius) && dy <= (paddle.getHalfHeight() + ball.radius)){
    ball.velocity.x *= -1;
  }
}

window.addEventListener('keydown', function(e: KeyboardEvent){
  keyPressed[e.keyCode] = true;
});

window.addEventListener('keyup', function(e: KeyboardEvent){
  keyPressed[e.keyCode] = false;
});


function drawGameScene(): void
{
  ctx.strokeStyle = "#FFFF00";
  ctx.lineWidth = 10;

  // Edge Lines
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(canvas.width, 0);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();

  ctx.stroke();

  // Center Line
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.closePath();

  ctx.stroke();

  // Center Circle
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 25, 0, Math.PI * 2);
  ctx.closePath();

  ctx.stroke();
}

function gameUpdate(): void{
  ball.update();
  ballCollisionWithEdges(ball);

  player1.update(keyPressed);
  paddleCollisionWithEdges(player1);

  // Controlled by AI
  // player2.update(keyPressed); // Key press control
  player2AI(canvas, ball, player2); // AI control
  paddleCollisionWithEdges(player2);  

  ballAndPaddleCollision(ball, player1);
  ballAndPaddleCollision(ball, player2);

  scoreIncrease();
}

function gameDraw(): void{
  
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ball.draw();
  player1.draw();
  player2.draw();
}

function gameLoop(): void{
  // ctx.clearRect(0, 0, canvas.width, canvas.height); 

  drawGameScene();
  
  // ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  window.requestAnimationFrame(gameLoop);

  gameUpdate();
  gameDraw();

}

drawGameScene();
gameDraw();

startButton.addEventListener('click', function(): void{

  startButton.classList.add('hidden');
  gameLoop();
});