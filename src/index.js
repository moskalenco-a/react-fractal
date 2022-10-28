import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';

import Fractal from './pages/Fractal';
import { drawPythagorasTree } from './DrawPythagorasTree';
import { drawMinkowskiFractal } from './DrawMinkowskiFractal';
import './index.css';

const MinkowskyIsland = (props) => {
  return (
    <Fractal drawFunc={drawMinkowskiFractal} minSize={150} maxSize={400} minLevels={1} maxLevels={5} defaultSize={210}
                        defaultLevels={5}/>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MinkowskyIsland />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
