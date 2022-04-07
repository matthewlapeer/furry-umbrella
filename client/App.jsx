import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import MainContainer from './Components/MainContainer';

const App = props => {
  return (
    <div className="router">
      <main>
        <Routes>
          <Route path="/" element={<MainContainer />}/>
        </Routes>
      </main>
    </div>
  )
}
export default App;