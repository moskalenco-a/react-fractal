import { useRef, useState, useEffect } from 'react';
import Page from '../components/Page';
import styles from './PythagorasTree.module.css';

const WIDTH = 500;
const HEIGHT = 500;

const draw = (ctx, drawFunc, initialSize = 50, levels = 9, cx = 250, cy = 350, color = '#000000', lineStyle = 'solid') => {
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
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  drawFunc(ctx, initialSize, levels, cx, cy);
};

const Fractal = (props) => {
  const canvasRef = useRef(null);

  const { drawFunc } = props;
  const { defaultSize = 50 } = props;
  const { defaultX = 250 } = props;
  const { defaultY = 350 } = props;
  const { defaultLevels = 9 } = props;
  const { defaultBorderColor = '#000000' } = props;
  const { defaultLineStyle = 'solid' } = props;

  const [initialSize, setInitialSize] = useState(defaultSize);
  const [levelsCount, setLevelsCount] = useState(defaultLevels);
  const [centerX, setCenterX] = useState(defaultX);
  const [centerY, setCenterY] = useState(defaultY);
  const [color, setColor] = useState(defaultBorderColor);
  const [lineStyle, setLineStyle] = useState(defaultLineStyle);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    draw(context, drawFunc, initialSize, levelsCount, centerX, centerY, color, lineStyle);
  }, [drawFunc, initialSize, levelsCount, centerX, centerY, color, lineStyle]);

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
    <Page>
      <div className={styles.container}>
        <div>
          <p>Initial size = {initialSize}</p>
          <input type="range" value={initialSize} min="1" max="200" step="1" onChange={onSizeChange} className={styles.range} />
          <p>Levels = {levelsCount}</p>
          <input type="range" value={levelsCount} min="1" max="10" step="1" onChange={onLevelsCountChange} className={styles.range} />
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
                width={WIDTH}
                height={HEIGHT}
                className={styles.canvas} />
      </div>
    </Page>
  );
};

export default Fractal;
