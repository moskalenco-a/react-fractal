import { sum, length, rotated, scaled } from './vecUtils';

const drawMinkowskiFractalImpl = (ctx, n, first, second, vec = { x: 1, y: 0 }) => {
  if (n === 0)
    return;

  if (n === 1) {
    ctx.beginPath();
    ctx.beginPath();
    ctx.moveTo(first.x, first.y);
    ctx.lineTo(second.x, second.y);
    ctx.stroke();
    // ctx.fill();
    return;
  }
  const d90 = Math.PI / 2;
  const len = length(first, second) / 4;
  let newVec = vec;
  let newFirst = first;
  let newSecond = sum(first, scaled(newVec, len));
  drawMinkowskiFractalImpl(ctx, n-1, newFirst, newSecond, newVec);

  newVec = rotated(vec, -d90);
  newFirst = newSecond;
  newSecond = sum(newFirst, scaled(newVec, len));
  drawMinkowskiFractalImpl(ctx, n-1, newFirst, newSecond, newVec);

  newVec = vec;
  newFirst = newSecond;
  newSecond = sum(newFirst, scaled(newVec, len));
  drawMinkowskiFractalImpl(ctx, n-1, newFirst, newSecond, newVec);

  newVec = rotated(vec, d90);
  newFirst = newSecond;
  newSecond = sum(newFirst, scaled(newVec, len));
  drawMinkowskiFractalImpl(ctx, n-1, newFirst, newSecond, newVec);

  // newVec = rotated(vec, d90);
  newFirst = newSecond;
  newSecond = sum(newFirst, scaled(newVec, len));
  drawMinkowskiFractalImpl(ctx, n-1, newFirst, newSecond, newVec);

  newVec = vec;
  newFirst = newSecond;
  newSecond = sum(newFirst, scaled(newVec, len));
  drawMinkowskiFractalImpl(ctx, n-1, newFirst, newSecond, newVec);

  newVec = rotated(vec, -d90);
  newFirst = newSecond;
  newSecond = sum(newFirst, scaled(newVec, len));
  drawMinkowskiFractalImpl(ctx, n-1, newFirst, newSecond, newVec);

  newVec = vec;
  newFirst = newSecond;
  newSecond = sum(newFirst, scaled(newVec, len));
  drawMinkowskiFractalImpl(ctx, n-1, newFirst, newSecond, newVec);
};
const Point = (x, y) => ({ x, y });

export const drawMinkowskiFractal = (ctx, initialSize = 50, levels = 9, cx = 250, cy = 350) => {
  const first = Point(cx, cy);
  const second = Point(cx + initialSize, cy);
  // drawMinkowskiFractalImpl(ctx, levels, first, second);
  drawMinkowskiFractalImpl(ctx, 6, first, second);
};
