import { useState, useEffect, useRef } from 'react';

import Page from '../components/Page';
import Range from '../components/Range';
import styles from './RotatingTriangle.module.css';

import { Point, length, sum, diff,
         transform, RotateAroundMatrix, TranslateMatrix,
         normalize, scale, multipleMatrices } from '../vecUtils';

const WIDTH = 1000;
const HEIGHT = 500;

const drawLine = (ctx, a, b, color = '#000000') => {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
};

// пошук третьої вершини
// правильного трикутника
const getThirdPoint = (a, b) => {
  // v = b - a
  let v = diff(b, a);
  // v = (y; -x) = вектор перпендикулярний
  v = { x: v.y, y: -v.x };
  // робимо довжину вектору 1
  normalize(v);
  // розтягуємо вектор на висоту правильного трикутника
  // висота = сторона(відстань між а і б) помножена на корень з 3 поділений на 2
  scale(v, length(b, a) * Math.sqrt(3) / 2);
  let sideCenter = sum(a, b);
  // знаходимо середину сторони
  // (a + b) / 2
  sideCenter.x /= 2;
  sideCenter.y /= 2;
  // до середини сторони
  // додаємо той вектор висоти
  // щоб отримати третю точку трикутника
  const c = sum(sideCenter, v);
  return c;
};

const validPoint = (point) => {
  return 0 < point.x && point.x < WIDTH &&
         0 < point.y && point.y < HEIGHT;
};

const RotatingTriangle = (props) => {
  const canvasRef = useRef(null);
  // кут повороту
  const [stepAngle, setStepAngle] = useState(0);
  // змішення по ікс
  const [offsetX, setOffsetX] = useState(0);

  // центр квадрату
  const centerX = Math.floor(WIDTH / 4);
  const centerY = Math.floor(HEIGHT / 2);
  const center = Point(centerX, centerY);

  // а і б = вершини трикутника
  let [a, setA] = useState(Point(centerX - 100 + offsetX, centerY * 1.2));
  let [b, setB] = useState(Point(centerX + 100 + offsetX, centerY * 1.2));
  let [c, setC] = useState(getThirdPoint(a, b));

  // функції які змінюють координати вершин
  const onAxChange = (event) => {
    const newX = +event.target.value;
    const newA = { ...a, x: newX };
    const newC = getThirdPoint(newA, b);
    if (validPoint(newA) && validPoint(newC)) {
      setA(newA);
      setC(newC);
    }
    else
      alert("Error, A.x is not valid: triangle is out of range");
  };
  const onAyChange = (event) => {
    const newY = +event.target.value;
    const newA = { ...a, y: newY };
    const newC = getThirdPoint(newA, b);
    if (validPoint(newA) && validPoint(newC)) {
      setA(newA);
      setC(newC);
    }
    else
      alert("Error, A.y is not valid: triangle is out of range");
  };
  const onBxChange = (event) => {
    const newX = +event.target.value;
    const newB = { ...b, x: newX };
    const newC = getThirdPoint(a, newB);
    if (validPoint(newB) && validPoint(newC)) {
      setB(newB);
      setC(newC);
    }
    else
      alert("Error, B.x is not valid: triangle is out of range");
  };
  const onByChange = (event) => {
    const newY = +event.target.value;
    const newB = { ...b, y: newY };
    const newC = getThirdPoint(a, newB);
    if (validPoint(newB) && validPoint(newC)) {
      setB(newB);
      setC(newC);
    }
    else
      alert("Error, B.y is not valid: triangle is out of range");
  };
  const [attachOffset, setAttachOffset] = useState(false);
  const onAttachOffsetChange = (event) => {
    setAttachOffset(event.target.checked);
  };

  const onExportClick = () => {
    let canvasUrl = canvasRef.current.toDataURL();
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;
    createEl.download = props.name || 'triangle-rotate';
    createEl.click();
    createEl.remove();
  };

  useEffect(() => {
    // setSumAngle(0);
    let sumAngle = 0;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const matrices1 = [
      TranslateMatrix(Point(offsetX * stepAngle, 0)),
      RotateAroundMatrix(-stepAngle / 180 * Math.PI, center),
    ];
    const matrices2 = [
      TranslateMatrix(Point(offsetX, 0)),
      RotateAroundMatrix(-stepAngle / 180 * Math.PI, center),
    ];
    const trans = (point) => {
      const matrs = attachOffset ? matrices1 : matrices2;
      return transform(multipleMatrices(...matrs), point);
    };

    // очищаємо область для малювання
    context.clearRect(0, 0, WIDTH, HEIGHT);
    // малюємо осі
    drawLine(context, Point(0, centerY), Point(WIDTH, centerY));
    drawLine(context, Point(centerX, 0), Point(centerX, HEIGHT));
    const offsetPoint = Point(offsetX, 0);
    // до вершин додаємо зміщення по іксу
    // також повертаємо вершини навколо центру
    // на потрібний кут
    const rotatedA = trans(a);
    const rotatedB = trans(b);
    const rotatedC = trans(c);
    // малюємо кожну сторону
    drawLine(context, rotatedA, rotatedB, '#ff0000');
    drawLine(context, rotatedB, rotatedC, '#ff0000');
    drawLine(context, rotatedA, rotatedC, '#ff0000');
    // // анмація
    // const interval = setInterval(() => {
    //   // збільшуємо кут
    //   sumAngle += stepAngle;
    // }, 50);
    // return () => clearInterval(interval);
  }, [stepAngle, offsetX, a, b, c, attachOffset]);

  return (
    <Page>
      <div className={styles.container}>
        <div>
          <p>Rotate angle: {stepAngle}</p>
          <Range value={stepAngle}
                 min={0} max={360}
                 onChange={(value) => setStepAngle(value)} />
          <p>X offset: {offsetX}</p>
          <Range value={offsetX}
                 min={-50} max={50}
                 onChange={(value) => setOffsetX(value)} />
          <div className={styles.cbCont}>
            <input type="checkbox"
                   className={styles.cb}
                   checked={attachOffset}
                   onChange={onAttachOffsetChange} />
            Attach offset to rotation
          </div>
          <p>A</p>
          <div>
            X: <input type="text" placeholder="X"
                   value={a.x} onChange={onAxChange} />
          </div>
          <div>
            Y: <input type="text" placeholder="Y"
                   value={a.y} onChange={onAyChange} />
          </div>
          <p>B</p>
          <div>
            X: <input type="text" placeholder="Y"
                   value={b.y} onChange={onByChange} />
          </div>
          <div>
            Y: <input type="text" placeholder="X"
                   value={b.x} onChange={onBxChange} />
          </div>
        </div>

        <div className={styles.canvas}>
          <canvas ref={canvasRef}
                  width={WIDTH}
                  height={HEIGHT}
                  className={styles.canvas} />
          <button className={styles.export}
                  onClick={onExportClick}>Export</button>
        </div>
      </div>
    </Page>
  );
};

export default RotatingTriangle;
