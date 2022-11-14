import { sum, length, rotated, scaled } from './vecUtils';

// ctx - графічний контекст
// n - кількість ітерацій
// first, second - початкова і кінцева точка
// vec - вектор напрямку
// для горизонтальної прямої злів направо це (1; 0)
const drawMinkowskiFractalImpl = (ctx, n, first, second, vec = { x: 1, y: 0 }) => {
  if (n === 0)
    return;
  if (second.y > first.y) vec = { x: 0, y: 1 };
  if (second.y < first.y) vec = { x: 0, y: -1 };
  // якщо n дорівнює 1
  if (n === 1) {
    // просто малюємо
    // відрізок first - second
    ctx.beginPath();
    ctx.moveTo(first.x, first.y);
    ctx.lineTo(second.x, second.y);
    ctx.stroke();
    // ctx.fill();
    return;
  }
  // кут в 90 градусів
  const d90 = Math.PI / 2;
  // чверть довжини відрізка
  const len = length(first, second) / 4;
  // будь-який відрізок AB
  // перетворюється на ламану з 8 частин
  // довжина кожної з 8 частинин ламаної = чверть довжини AB(тобто len)

  // малюємо CD
  // вектор напряму такий же
  let newVec = vec;
  // перша точка, C
  let newFirst = first;
  // друга точка, D
  // додаємо до першої точки
  // вектор розтянутий до довжини len(довжина вектора CD)
  // (nevVec дорівнює vec, а ми будемо в функцію передавати
  //  vec завжди нормалізованим = тобто довжина вже дорівнює 1)
  let newSecond = sum(first, scaled(newVec, len));
  // для CD рекурсивно малюєто таку криву
  drawMinkowskiFractalImpl(ctx, n-1, newFirst, newSecond, newVec);

  // повертаємо вектор на 90 градусів
  // щоб отримати вектор DE
  newVec = rotated(vec, -d90);
  // початкова точка дорівнює
  // кінцевій від попереднього відрізку
  newFirst = newSecond;
  // точка E = D + вектор DE
  newSecond = sum(newFirst, scaled(newVec, len));
  // для DE рекурсивно малюємо таку саму криву
  drawMinkowskiFractalImpl(ctx, n-1, newFirst, newSecond, newVec);

  // малюємо EF
  // вектор такий же як CD
  newVec = vec;
  // початкова точка дорівнює
  // кінцевій від попереднього відрізку
  newFirst = newSecond;
  // кінцева точка = початкова + вектор
  newSecond = sum(newFirst, scaled(newVec, len));
  // малюємо рекурсивно EF
  drawMinkowskiFractalImpl(ctx, n-1, newFirst, newSecond, newVec);

  // повертаємо вектор на 90
  // щоб отримати з вектору EF(CD)
  // вектор FG
  newVec = rotated(vec, d90);
  // малюємо рекурсивно FG
  newFirst = newSecond;
  newSecond = sum(newFirst, scaled(newVec, len));
  drawMinkowskiFractalImpl(ctx, n-1, newFirst, newSecond, newVec);

  // з таким самим вектором
  // малюємо GH
  // newVec = rotated(vec, d90);
  newFirst = newSecond;
  newSecond = sum(newFirst, scaled(newVec, len));
  drawMinkowskiFractalImpl(ctx, n-1, newFirst, newSecond, newVec);

  // малюємо HI
  // вектор такий же(як у CD, EF)
  newVec = vec;
  newFirst = newSecond;
  newSecond = sum(newFirst, scaled(newVec, len));
  drawMinkowskiFractalImpl(ctx, n-1, newFirst, newSecond, newVec);

  // малюємо IJ
  // вектор як у DE
  newVec = rotated(vec, -d90);
  newFirst = newSecond;
  newSecond = sum(newFirst, scaled(newVec, len));
  drawMinkowskiFractalImpl(ctx, n-1, newFirst, newSecond, newVec);

  // малюємо JK
  // вектор напряму такий же
  // як у CD
  newVec = vec;
  newFirst = newSecond;
  newSecond = sum(newFirst, scaled(newVec, len));
  drawMinkowskiFractalImpl(ctx, n-1, newFirst, newSecond, newVec);
};
const Point = (x, y) => ({ x, y });

// у цій функції
// просто визначаємо вершини квадрату
// і для кожної сторони малюємо одну криву рекурсивно
export const drawMinkowskiFractal = (ctx, initialSize = 50, levels = 3, cx = 250, cy = 350) => {
  const first = Point(cx, cy);
  const second = Point(cx + initialSize, cy);
  drawMinkowskiFractalImpl(ctx, levels, first, second);
  drawMinkowskiFractalImpl(ctx, levels, first, Point(cx, cy + initialSize));
  drawMinkowskiFractalImpl(ctx, levels, Point(cx, cy + initialSize), Point(cx + initialSize, cy + initialSize));
  drawMinkowskiFractalImpl(ctx, levels, second, Point(cx + initialSize, cy + initialSize));
};
