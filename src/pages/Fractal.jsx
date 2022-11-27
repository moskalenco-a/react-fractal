import { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import Page from '../components/Page';
import Range from '../components/Range';
import styles from './Fractal.module.css';

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

const validPoint = (point) => {
  return 0 < point.x && point.x < WIDTH &&
         0 < point.y && point.y < HEIGHT;
};

const Fractal = (props) => {
  const canvasRef = useRef(null);

  const { minSize = 1, maxSize = 200 } = props;
  const { minLevels = 1 } = props;
  const { maxLevels = 9 } = props;

  const { infoTitle, infoText } = props;

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

  const onSizeChange = (value) => {
    setInitialSize(value);
  };
  const onLevelsCountChange = (value) => {
    setLevelsCount(value);
  };
  const onCenterXChange = (event) => {
    const value = +event.target.value;
    if (validPoint({ x: value, y: centerY }))
      setCenterX(value);
    else
      alert("Invalid center X: out of rarnge");
  };
  const onCenterYChange = (event) => {
    const value = +event.target.value;
    if (validPoint({ x: centerX, y: value }))
      setCenterY(value);
    else
      alert("Invalid center Y: out of rarnge");
  };
  const onColorChange = (event) => {
    setColor(event.target.value);
  };
  const onLineStyleChange = (event) => {
    setLineStyle(event.target.value);
  };
  const linkActive = ({ isActive }) => isActive ? styles.activeLink : undefined;
  const onExportClick = () => {
    let canvasUrl = canvasRef.current.toDataURL();
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;
    createEl.download = props.name || "fractal";
    createEl.click();
    createEl.remove();
  };
  return (
    <Page>
      <div className={styles.info}>
        <p className={styles.infoButton}>{infoTitle}</p>
        <p className={styles.infoText}>{infoText}</p>
      </div>
      <div className={styles.container}>
        <div>
          <p>Initial size = {initialSize}</p>
          <Range value={initialSize}
                 min={minSize} max={maxSize}
                 onChange={onSizeChange} />
          <p>Levels = {levelsCount}</p>
          <Range value={levelsCount}
                 min={minLevels} max={maxLevels}
                 onChange={onLevelsCountChange} />
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

        <div className={styles.canvas}>
          <canvas ref={canvasRef}
                  width={WIDTH}
                  height={HEIGHT}
                  className={styles.canvas} />
          <button className={styles.export}
                  onClick={onExportClick}>Export</button>
        </div>
      </div>
      <div className={styles.links}>
        <NavLink className={linkActive} to="/pythagor">Pythagoras Tree</NavLink>
        <NavLink className={linkActive} to="/minkowsky">Minkowsky Island</NavLink>
      </div>
    </Page>
  );
};

export default Fractal;
