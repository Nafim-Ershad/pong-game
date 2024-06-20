import { Ball, Paddle } from "./ObjectClasses"

export type Vec2 = {
    x: number, 
    y: number
}

export function vec2(x: number, y: number): Vec2
{
    return{
        x: x,
        y: y
    }
}

export function player2AI(canvas: HTMLCanvasElement, ball: Ball, paddle: Paddle): void
{
    if( paddle.velocity.y > 0)
    {
        if(ball.position.y > paddle.position.y)
        {
            paddle.position.y += paddle.velocity.y;

            if(paddle.position.y + paddle.height >= canvas.height)
            {
                paddle.position.y = canvas.height - paddle.height;
            }
        }

        if(ball.position.y < paddle.position.y)
        {
            paddle.position.y -= paddle.velocity.y;
            if(paddle.position.y <= 0)
            {
                paddle.position.y = 0;
            }
        }
    }
}

export function respawnBall(canvas: HTMLCanvasElement, ball: Ball): void
{
    if(ball.velocity.x > 0)
    {
        ball.position.x = canvas.width / 2;
        ball.position.y = Math.random() * (canvas.height / 2) + 100;
    }
    
    if(ball.velocity.x < 0)
    {
        ball.position.x = canvas.width / 2;
        ball.position.y = Math.random() * (canvas.height / 2) + 100;
    }

    ball.velocity.x *= -1;
    ball.velocity.y *= -1;
}