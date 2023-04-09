import { useState, useRef, useEffect } from 'react';
import _, { isArray } from 'lodash';
import './App.css';
import Header from './components/Header';
import Player from './components/Player';
import Drawer from './components/Drawer';
import mp3 from './test.mp3';
import ColorList from './color';

function App() {
  // 当前情感
  const [emotion, setEmotion] = useState(ColorList[0]);
  // 输入语句
  const [words, setWords] = useState('');
  // 默认输入模式，输入模式不可播放音乐
  const [inputMode, setInputMode] = useState(true);
  // 生成的音乐列表
  const [musicList, setMusicList] = useState([]);
  // 历史数据
  const [history, setHistory] = useState([
    {
      time: '2023.04.08 21:33',
      word: '虽然很难，但我想尽力赢下这场比赛。',
      emotion: '得意',
      background: ColorList.find(item => item.name.includes('得意')).color
    }
  ]);
  // 展示侧边栏
  const [showDrawer, setShowDrawer] = useState(false);
  // 播放音乐
  const [isPlaying, setIsPlaying] = useState(false);

  const debouncedSetWords = _.debounce((value) => setWords(value), 500);

  useEffect(() => {
    if (words.length > 0) {
      fetch(`/api/emotion/text-emotion?message=${words}`).then(response => response.json())
        .then(data => {
          setEmotion(ColorList.find(item => {
            if (item.name.includes(data.emotion)) {
              return item;
            } else {
              // 无感
              return ColorList[1];
            }
          }));
          setInputMode(false);
          setMusicList(isArray(data.music) ? data.music : []);
          // 返回音乐就播放
          setIsPlaying(true);
        })
        .catch(error => console.error(error));
    }
  }, [words])

  return (
    <div
      className="App"
      style={{
        background: inputMode ? '#efefef' : `linear-gradient(to bottom,${emotion.bgColor} , #efefef)`,
      }}
    >
      <Header
        emotion={emotion}
        musicList={musicList}
        setIsPlaying={setIsPlaying}
      />
      {/* 输入模式 */}
      {
        inputMode && (
          <textarea
            placeholder='写下你的故事或此刻的情绪'
            className='input'
            value={words}
            onChange={(e) => debouncedSetWords(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                debouncedSetWords(e.target.value);
                // Dispatch a click event or call another function here
              }
            }}
          />
        )
      }
      {/* 非输入模式展示 */}
      {
        !inputMode && (
          <>
            <div className='words'>{words}</div>
            <div className='buttons'>
              <div
                className='button'
                onClick={() => {
                  // 点击编辑，音乐停止播放
                  // input框回显
                  setInputMode(true);
                  setIsPlaying(false);
                }}
              >
                编辑
              </div>
              <div className='saveBtn' onClick={() => setShowDrawer(false)}>
                保存
              </div>
            </div>
          </>
        )
      }
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        src={mp3}
        disabled={inputMode}
        coverColor={emotion.color}
      />
      <Drawer
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        history={history}
      />
    </div>
  );
}

export default App;
