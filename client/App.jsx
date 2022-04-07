import React, { Component } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import MainContainer from './Components/MainContainer';
import ProjectDisplay from './Components/ProjectDisplay';

const App = props => {
  return (
    <div className="router">
      <main>
        <Routes>
          <Route path="/" element={<MainContainer />}/>
          <Route path="/projects/display" element={<ProjectDisplay id ={(useLocation()).state}/>}/>
        </Routes>
      </main>
    </div>
  )
}
export default App;
