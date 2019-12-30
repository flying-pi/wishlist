import React from 'react';
import './App.css';
import LoginComponent from './components/LoginComponent'
import MainComponent from './components/MainComponent'
import Scene from './components/BackComponent'
import { Canvas } from 'react-three-fiber'


function App() {
  return (
      <div className="main">
          <Canvas style={{background: '#324444'}} camera={{position: [0, 50, 10], fov: 75}}>
              <Scene/>
          </Canvas>
          {/*<LoginComponent/>*/}
          <MainComponent/>
      </div>
  );
}

export default App;
