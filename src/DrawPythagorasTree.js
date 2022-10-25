import { Point, sum, diff,
         normalize, scale, rotate
       } from './vecUtils';

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

const drawPythagorasTreeImpl = (ctx, n, a, b, c, d) => {
  if (n === 0)
    return;

  const alpha = Math.PI / 6;         // 30
  const  beta = Math.PI / 2 - alpha; // 60

  const side = Math.hypot(b.x - c.x, b.y - c.y);
  const leftSide = side * Math.sin(beta);
  let vec = diff(d, a);
  normalize(vec);
  rotate(vec, -alpha);
  scale(vec, leftSide);
  let newB = a;
  let newC = sum(newB, vec);
  rotate(vec, -Math.PI / 2);
  let newA = sum(newB, vec);
  let newD = sum(newC, vec);
  drawRect(ctx, a, b, c, d);
  drawPythagorasTreeImpl(ctx, n - 1, newA, newB, newC, newD);

  const rightSide = side * Math.sin(alpha);
  vec = diff(a, d);
  normalize(vec);
  rotate(vec, beta + Math.PI / 2);
  scale(vec, rightSide);
  newB = newC;
  newC = d;
  newD = sum(newC, vec);
  newA = sum(newB, vec);
  drawPythagorasTreeImpl(ctx, n - 1, newA, newB, newC, newD);
};

export const drawPythagorasTree = (ctx, initialSize = 50, levels = 9, cx = 250, cy = 350) => {
  const first = Point(cx, cy);
  const second = Point(cx, cy + initialSize);
  const third = Point(cx + initialSize, cy + initialSize);
  const last = Point(cx + initialSize, cy);
  drawPythagorasTreeImpl(ctx, levels, first, second, third, last);
};
