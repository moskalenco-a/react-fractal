import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';

import Page from './components/Page';
import Fractal from './pages/Fractal';
import RotatingTriangle from './pages/RotatingTriangle';
import { drawPythagorasTree } from './DrawPythagorasTree';
import { drawMinkowskiFractal } from './DrawMinkowskiFractal';
import './index.css';

const MinkowskyIsland = (props) => {
  return (
    <Fractal name="minkowsky"
             drawFunc={drawMinkowskiFractal}
             minSize={150} maxSize={400}
             minLevels={1} maxLevels={5}
             defaultSize={210} defaultLevels={3}
             defaultX={150} defaultY={150} />
  );
};

const PythagorasTree = (props) => {
  return (
    <Fractal name="pythagoras"
             drawFunc={drawPythagorasTree}
             minSize={50} maxSize={400}
             minLevels={1} maxLevels={10}
             defaultSize={77} defaultLevels={9}
             defaultX={288} defaultY={333} />
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
// <Route path="/" element={<MinkowskyIsland />} />
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RotatingTriangle />} />
        <Route path="/pythagor" element={<PythagorasTree />} />
        <Route path="/minkowsky" element={<MinkowskyIsland />} />
        <Route path="/rotate" element={<RotatingTriangle />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
