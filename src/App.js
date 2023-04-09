import { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import './App.css';
import Header from './components/Header';
import Player from './components/Player';
import mp3 from './test.mp3';
import ColorList from './color';

function App() {
  const [emotion, setEmotion] = useState(ColorList[0]);
  const [words, setWords] = useState('');

  const debouncedSetWords = _.debounce((value) => setWords(value), 500);

  useEffect(() => {
    if (words.length > 0) {
      fetch(`/api/emotion/text-emotion?message=${words}`).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }
  }, [words])

  return (
    <div
      className="App"
      style={{
        background: `linear-gradient(to bottom,${emotion.bgColor} , #efefef)`,
      }}
    >
      <Header />
      <textarea
        placeholder='写下你的故事或此刻的情绪'
        className='input'
        onChange={(e) => debouncedSetWords(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            debouncedSetWords(e.target.value);
            // Dispatch a click event or call another function here
          }
        }}
      />
      <Player src={mp3} />
    </div>
  );
}

export default App;
