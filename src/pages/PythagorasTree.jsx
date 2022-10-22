import { useRef, useEffect } from 'react';
import styles from './PythagorasTree.module.css';

const drawRect = (ctx, a, b, c, d) => {
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.lineTo(c.x, c.y);
  ctx.lineTo(d.x, d.y);
  ctx.lineTo(a.x, a.y);
  ctx.stroke();
  ctx.fill();
};

const normalize = (vec) => {
  let l = Math.hypot(vec.x, vec.y);
  vec.x /= l;
  vec.y /= l;
};

const rotate = (vec, angle) => {
  const x = vec.x * Math.cos(angle) - vec.y * Math.sin(angle);
  const y = vec.x * Math.sin(angle) + vec.y * Math.cos(angle);
  vec.x = x;
  vec.y = y;
};

const scale = (vec, value) => {
  vec.x *= value;
  vec.y *= value;
};

const sum = (vec1, vec2) => {
  return {
    x: vec1.x + vec2.x,
    y: vec1.y + vec2.y
  };
};

const drawTree = (ctx, n, a, b, c, d) => {
  if (n === 0)
    return;
  // console.log(a);
  // console.log(b);
  // console.log(c);
  const alpha = Math.PI / 3; // 60
  const  beta = Math.PI / 6; // 30

  const side = Math.hypot(b.x - c.x, b.y - c.y);
  const leftSide = side * Math.sin(beta);
  const height = leftSide * Math.sin(alpha);
  let vec = { x: c.x - b.x, y: c.y - b.y };
  normalize(vec);
  rotate(vec, alpha);
  scale(vec, leftSide);
  const newA = b;
  const newD = sum(newA, vec);
  rotate(vec, Math.PI / 2);
  const newB = sum(newA, vec);
  const newC = sum(newD, vec);
  // const x = b.x + vec.x * ()
  drawRect(ctx, a, b, c, d);
  drawTree(ctx, n - 1, newA, newB, newC, newD);
}

const draw = (ctx) => {
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#0f0";
  const Point = (x, y) => ({x, y});
  const xs = 80;
  const ys = 70;
  const side = 90;
  const first = Point(xs, ys);
  const second = Point(xs, ys + side);
  const third = Point(xs + side, ys + side);
  const last = Point(xs + side, ys);
  ctx.clearRect(0, 0, 500, 500);
  drawTree(ctx, 3, first, second, third, last);
};

const PythagorasTree = (props) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    draw(context);
  }, [draw]);

  return (
    <canvas ref={canvasRef}
            width="500"
            height="500"
            className={styles.canvas} />
  );
};

export default PythagorasTree;
