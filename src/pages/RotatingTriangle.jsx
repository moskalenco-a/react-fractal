import { useState, useEffect, useRef } from 'react';

import Page from '../components/Page';
import Range from '../components/Range';
import styles from './RotatingTriangle.module.css';

import { Point, length, sum, diff,
         normalize, scale, rotatedAround } from '../vecUtils';

const WIDTH = 500;
const HEIGHT = 500;

const drawLine = (ctx, a, b, color = '#000000') => {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
};

const RotatingTriangle = (props) => {
  const canvasRef = useRef(null);
  const [sumAngle, setSumAngle] = useState(0);
  const [stepAngle, setStepAngle] = useState(0);
  const [offsetX, setOffsetX] = useState(0);

  const centerX = Math.floor(WIDTH / 2);
  const centerY = Math.floor(HEIGHT / 2);
  const center = Point(centerX, centerY);

  let [a, setA] = useState(Point(centerX - 100 + offsetX, centerY * 1.2));
  let [b, setB] = useState(Point(centerX + 100 + offsetX, centerY * 1.2));
  let v = diff(b, a);
  v = { x: v.y, y: -v.x };
  normalize(v);
  scale(v, length(b, a) * Math.sqrt(3) / 2);
  let sideCenter = sum(a, b);
  sideCenter.x /= 2;
  sideCenter.y /= 2;
  const c = sum(sideCenter, v);

  const onAxChange = (event) => {
    setA(p => ({...p, x: +event.target.value}));
  };
  const onAyChange = (event) => {
    setA(p => ({...p, y: +event.target.value}));
  };
  const onBxChange = (event) => {
    setB(p => ({...p, x: +event.target.value}));
  };
  const onByChange = (event) => {
    setB(p => ({...p, y: +event.target.value}));
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
    setSumAngle(0);
    let sumAngle = 0;
    const interval = setInterval(() => {
      // setSumAngle(sumAngle => sumAngle + stepAngle);
      sumAngle += stepAngle;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      context.clearRect(0, 0, WIDTH, HEIGHT);
      drawLine(context, Point(0, centerY), Point(WIDTH, centerY));
      drawLine(context, Point(centerX, 0), Point(centerX, HEIGHT));
      const offsetPoint = Point(offsetX, 0);
      const rotatedA = rotatedAround(sum(a, offsetPoint), center, sumAngle / 180 * Math.PI);
      const rotatedB = rotatedAround(sum(b, offsetPoint), center, sumAngle / 180 * Math.PI);
      const rotatedC = rotatedAround(sum(c, offsetPoint), center, sumAngle / 180 * Math.PI);
      drawLine(context, rotatedA, rotatedB, '#ff0000');
      drawLine(context, rotatedB, rotatedC, '#ff0000');
      drawLine(context, rotatedA, rotatedC, '#ff0000');
    }, 500);
    return () => clearInterval(interval);
  }, [stepAngle, offsetX, a, b, c]);

  // useEffect(() => {
  // }, [sumAngle]);

  return (
    <Page>
      <div className={styles.container}>
        <div>
          <p>Rotate around center</p>
          <Range value={stepAngle}
                 min={0} max={360}
                 onChange={(value) => setStepAngle(value)} />
          <p>X offset: {offsetX}</p>
          <Range value={offsetX}
                 min={-20} max={20}
                 onChange={(value) => setOffsetX(value)} />
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
