import {vec2, type Vec2} from "./utilities";
import * as KEY from "./KEYPRESS";

export class Ball{
    ctx?: CanvasRenderingContext2D;
    position: Vec2;
    velocity: Vec2;
    radius: number;
    constructor(context: CanvasRenderingContext2D, position: Vec2, velocity: Vec2, radius: number){
        this.ctx = context
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
    }

    update(){
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    draw(){
        if(this.ctx != undefined){
        this.ctx.strokeStyle = "#33FF00";
        this.ctx.fillStyle = "#33FF00";

        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        
        this.ctx.fill();
        this.ctx.stroke();
        }
    }
}

export class Paddle{
    ctx?: CanvasRenderingContext2D;
    position: Vec2;
    velocity: Vec2;
    width: number;
    height: number;
    score: number;
    constructor(context: CanvasRenderingContext2D, position: Vec2, velocity: Vec2, width: number, height: number){
        this.ctx = context;
        this.position = position;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.score = 0;
    }
  
    draw(): void{
      if(this.ctx != undefined){
        this.ctx.fillStyle = '#33ff00';
        this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
      }
    }
  
    update(keyPressed: boolean[]): void{
      if(keyPressed[KEY.KEY_UP]){
        this.position.y -= this.velocity.y;
      }
      if(keyPressed[KEY.KEY_DOWN]){
        this.position.y += this.velocity.y;
      }
    }
  
    getHalfHeight(): number{
      return this.height / 2;
    }
    
    getHalfWidth(): number{
      return this.width / 2;
    }
  
    getCenter(): Vec2{
      return vec2(
        this.position.x + this.getHalfWidth(),
        this.position.y + this.getHalfHeight()
      );
    }
  }