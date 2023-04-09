import { useState, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import Player from './components/Player';
import mp3 from './test.mp3';
import ColorList from './color';

function App() {
  const [emotion, setEmotion] = useState(ColorList[0]);

  return (
    <div className="App">
      <Header />
      <input
        placeholder='写下你的故事或此刻的情绪'
        className='input'
      />
      <Player src={mp3} />
    </div>
  );
}

export default App;
