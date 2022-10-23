import { useRef, useState, useEffect } from 'react';
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

const diff = (vec1, vec2) => {
  return {
    x: vec1.x - vec2.x,
    y: vec1.y - vec2.y
  };
};

const Point = (x, y) => ({x, y});

const drawTree = (ctx, n, a, b, c, d) => {
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
  drawTree(ctx, n - 1, newA, newB, newC, newD);

  const rightSide = side * Math.sin(alpha);
  vec = diff(a, d);
  normalize(vec);
  rotate(vec, beta + Math.PI / 2);
  scale(vec, rightSide);
  newB = newC;
  newC = d;
  newD = sum(newC, vec);
  newA = sum(newB, vec);
  drawTree(ctx, n - 1, newA, newB, newC, newD);
};

const draw = (ctx, initialSize = 50, levels = 9, cx = 250, cy = 350, color = '#000000', lineStyle = 'solid') => {
  const lineStyles = {
    solid: [],
    dash: [10, 10],
    dot: [1, 1],
    dashdot: [12, 3, 3],
  };
  ctx.setLineDash(lineStyles[lineStyle]);
  ctx.lineWidth = 3;
  ctx.strokeStyle = color;
  ctx.fillStyle = '#00ff00';
  const first = Point(cx, cy);
  const second = Point(cx, cy + initialSize);
  const third = Point(cx + initialSize, cy + initialSize);
  const last = Point(cx + initialSize, cy);
  ctx.clearRect(0, 0, 500, 500);
  drawTree(ctx, levels, first, second, third, last);
};

const PythagorasTree = (props) => {
  const canvasRef = useRef(null);

  const [initialSize, setInitialSize] = useState(50);
  const [levelsCount, setLevelsCount] = useState(9);
  const [centerX, setCenterX] = useState(250);
  const [centerY, setCenterY] = useState(350);
  const [color, setColor] = useState('#000000');
  const [lineStyle, setLineStyle] = useState('solid');
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    draw(context, initialSize, levelsCount, centerX, centerY, color, lineStyle);
  }, [draw, initialSize, levelsCount, centerX, centerY, color, lineStyle]);

  const onSizeChange = (event) => {
    setInitialSize(parseInt(event.target.value));
  };
  const onLevelsCountChange = (event) => {
    setLevelsCount(parseInt(event.target.value));
  };
  const onCenterXChange = (event) => {
    setCenterX(parseInt(event.target.value));
  };
  const onCenterYChange = (event) => {
    setCenterY(parseInt(event.target.value));
  };
  const onColorChange = (event) => {
    setColor(event.target.value);
  };
  const onLineStyleChange = (event) => {
    setLineStyle(event.target.value);
  }
  return (
    <div className={styles.container}>
      <div>
        <p>Initial size = {initialSize}</p>
        <input type="range" value={initialSize} min="1" max="200" step="1" onChange={onSizeChange} />
        <p>Levels = {levelsCount}</p>
        <input type="range" value={levelsCount} min="1" max="10" step="1" onChange={onLevelsCountChange} />
        <p>Center:</p>
        <div className={styles.coords}>
          <div className={styles.coordX}>
            <p>X:</p>
            <input type="text" placeholder="X" value={centerX} onChange={onCenterXChange} className={styles.coordXInput} />
          </div>
          <div className={styles.coordY}>
            <p>Y:</p>
            <input type="text" placeholder="Y" value={centerY} onChange={onCenterYChange} className={styles.coordYInput} />
          </div>
        </div>
        <div className={styles.colorContainer}>
          <select value={lineStyle} onChange={onLineStyleChange}>
            <option value="solid">Solid</option>
            <option value="dash">Dash</option>
            <option value="dot">Dot</option>
            <option value="dashdot">Dashdot</option>
          </select>
          <p>Color:</p>
          <input type="color" value={color} onChange={onColorChange} />
        </div>
        <div>
        </div>
      </div>

      <canvas ref={canvasRef}
              width="500"
              height="500"
              className={styles.canvas} />
    </div>
  );
};

export default PythagorasTree;
