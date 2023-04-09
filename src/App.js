import { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import './App.css';
import Header from './components/Header';
import Player from './components/Player';
import Drawer from './components/Drawer';
import back from './imgs/back.svg';
import mp3 from './test.mp3';
import ColorList from './color';

function App() {
  // 当前情感
  const [emotion, setEmotion] = useState(ColorList[0]);
  // 输入语句
  const [words, setWords] = useState('');
  // 默认输入模式，输入模式不可播放音乐
  const [inputMode, setInputMode] = useState(true);
  const inputRef = useRef(null);
  // 生成的音乐列表
  const [musicList, setMusicList] = useState([]);
  // 当前播放的音乐
  const [currentMusic, setCurrentMusic] = useState(mp3);
  // 历史数据
  const [history, setHistory] = useState([]);
  // 展示侧边栏
  const [showDrawer, setShowDrawer] = useState(false);
  // 播放音乐
  const [isPlaying, setIsPlaying] = useState(false);
  // 图片name
  const [imgName, setImgName] = useState('');
  // 图片文件
  const [imgSrc, setImgSrc] = useState('');

  const debouncedSetWords = _.debounce((value) => setWords(value), 500);
  // 获取情感，音乐列表
  useEffect(() => {
    if (words.length > 0) {
      fetch(`/api/emotion/text-emotion?message=${words}`).then(response => response.json())
        .then(data => {
          const res = ColorList.find(item => item.name.includes(data.emotion));
          console.log(res)
          if (res) {
            setEmotion(res);
          } else {
            // 无感
            setEmotion(ColorList[1]);
          }
          setInputMode(false);
          setIsPlaying(true);
          setMusicList(data.musicname.split(','));

        })
        .catch(error => console.error(error));
    }
  }, [words])

  // 给输入框赋值
  useEffect(() => {
    if (inputMode && inputRef.current && words.length > 0) {
      inputRef.current.value = words;
    }
  }, [words, inputMode, inputRef]);

  // 获取音乐url
  useEffect(() => {
    if (musicList.length > 0) {
      setCurrentMusic(`http://39.103.151.105:64641/music?fileName=${musicList[0]}`);
    }
  }, [musicList]);

  // 获取图片url
  useEffect(() => {
    if (imgName) {
      setImgSrc(`http://39.103.151.105:64641/img?imgPath=${imgName}`);
    }
  }, [imgName])

  // 获取历史列表
  useEffect(() => {
    if (showDrawer) {
      fetch('/cards').then(response => response.json()).then(data => {
        setHistory(data.map(item => {
          const currentEmo = ColorList.find(item => item.name.includes(item.emotionTag));
          return {
            ...item,
            bgColor: currentEmo? currentEmo.bgColor : ColorList[1].bgColor
          }
        }));
        console.log(history)
      })
    }
  }, [showDrawer])

  // 保存卡片
  const createCard = () => {
    const formData = new FormData();
    formData.append('emotionTag', emotion.name[0]);
    formData.append('imgPath', imgName);
    formData.append('musicName', musicList[0]);
    formData.append('text', words);

    fetch('/card', {
      method: 'POST',
      body: formData
    }).then(response => response.json()).then(data => {
      setShowDrawer(true);
    })

  }

  return (
    <div
      className="App"
      style={{
        background: inputMode ? '#efefef' : `linear-gradient(to bottom,${emotion.bgColor} , #efefef)`,
      }}
    >
      <Header
        musicList={musicList}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        inputMode={inputMode}
        setCurrentMusic={setCurrentMusic}
        setImgName={setImgName}
      />
      {/* 输入模式 */}
      {
        inputMode && (
          <textarea
            placeholder='写下你的故事或此刻的情绪'
            className='input'
            ref={inputRef}
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
          <div className='showZone'>
            <div className='words'>{words}</div>
            <img src={imgSrc} alt="" className='imgShow' />
            <div className='buttons'>
              <div
                className='button'
                onClick={() => {
                  // 点击编辑，音乐停止播放
                  // input框回显
                  setInputMode(true);
                  setIsPlaying(false);
                  // 返回默认情感
                  setEmotion(ColorList[0]);
                }}
              >
                编辑
              </div>
              <div className='saveBtn' onClick={() => createCard()}>
                保存
              </div>
            </div>
          </div>
        )
      }
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        src={currentMusic}
        disabled={inputMode}
        coverColor={emotion.color}
      />
      {
      showDrawer &&(
          <>
            <Drawer
              showDrawer={showDrawer}
              setShowDrawer={setShowDrawer}
              history={history}
              setIsPlaying={setIsPlaying}
              setCurrentMusic={setCurrentMusic}
              setImgName={setImgName}
              setWords={setWords}
              setEmotion={setEmotion}
            />
            <div
              className='close'
              onClick={() => setShowDrawer(false)}>
                <img src={back} alt="" className='closeBtn'/>
              </div>
          </>
        )
      }

    </div>
  );
}

export default App;
