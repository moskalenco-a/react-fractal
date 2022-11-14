import { Point, sum, diff,
         normalize, scale, rotate
       } from './vecUtils';

// малювання прямокутника
// ctx графічний контекст
// a, b, c, d вершини прямокутника
const drawRect = (ctx, a, b, c, d) => {
  // початок малювання нової лінії
  ctx.beginPath();
  // переходимо у вершину A
  ctx.moveTo(a.x, a.y);
  // з'єднуємо відрізком з B
  ctx.lineTo(b.x, b.y);
  // з'єднуємо відрізком B з C
  ctx.lineTo(c.x, c.y);
  // з'єднуємо відрізком C з D
  ctx.lineTo(d.x, d.y);
  // з'єднуємо відрізком D з A
  ctx.lineTo(a.x, a.y);
  // малюємо отриманий контур
  ctx.stroke();
  // заповнюємо внутрішню область
  ctx.fill();
};

// малювання дерева, n кількість ітерацій
// A, B, C, D вершини квадрату
const drawPythagorasTreeImpl = (ctx, n, a, b, c, d) => {
  // виходимо якщо n
  // дорівнює нулю
  if (n === 0)
    return;

  // кут EAD
  const alpha = Math.PI / 6;         // 30
  // кут EDA, 90 градусів мінус інший гострий кут
  const  beta = Math.PI / 2 - alpha; // 60
  // довжина сторони квадрату за теоремою Піфагора
  // (тобто відстань між B, C)
  const side = Math.hypot(b.x - c.x, b.y - c.y);
  // довжина сторони AE малого квадрату зліва
  // = гіпотенуза AD * синус кута навпорти AE(кут EDA)
  const leftSide = side * Math.sin(beta);
  // знаходимо вектор AD
  // (від кінцевої точки віднімаємо початкову)
  let vec = diff(d, a);
  // нормалізуємо = робимо так,
  // щоб довжина вектора дорівнювала 1
  // щоб потім розтянути вектор на потрібну довжну
  normalize(vec);
  // повертаємо вектор на кут EAD
  // так, щоб напрям вектора зпівпав зі стороною AE
  rotate(vec, -alpha);
  // тепер розтягуємо вектор
  // щоб його довжина дорівнювала довжині
  // сторони AE
  scale(vec, leftSide);
  // визначаємо вершини нового квадрату
  // тобто точки F, A, E, G
  // нова вершина B це просто A
  let newB = a;
  // нова вершина C, це точка E
  // додаємо до точки A(newB) вектор AE(vec) щоб отримати
  // точку E(newC)
  let newC = sum(newB, vec);
  // повертаємо вектор на 90 градусів
  // щоб отримати з вектора AE
  // вектор AF
  rotate(vec, -Math.PI / 2);
  // нова вершина A це точка F
  // F це A додати вектор AF(vec)
  let newA = sum(newB, vec);
  // нова вершина D точка G
  // ії можна отримати
  // якщо той самий вектор AF(рівний вектору EG)
  // додати до точки E(newC)
  let newD = sum(newC, vec);
  drawRect(ctx, a, b, c, d);
  // рекурсивно малюємо фрактал
  // для лівого квадрату
  drawPythagorasTreeImpl(ctx, n - 1, newA, newB, newC, newD);

  // те ж саме для правого квадрату
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
