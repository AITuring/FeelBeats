import React, { useState, useRef } from 'react';

// 导入黑胶唱片图片和播放按钮图片
import cover from './cover.jpg';
import needle from '../../imgs/needle.png';
import disc from '../../imgs/disc.png';
import playBtn from './play.png';
import './style.css'; // 导入组件样式

function MP3Player(props) {
    const [isPlaying, setIsPlaying] = useState(false); // 用于表示是否正在播放
    const audioRef = useRef(null); // 用于引用audio元素

    // 播放/暂停按钮的点击处理函数
    const handlePlayPauseClick = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className='record'>
            <div className={isPlaying ? "needle" : "stop"} onClick={handlePlayPauseClick}></div>
            <div className="center">
                <div className="cover" onClick={handlePlayPauseClick}>
                </div>
            </div>
            <audio ref={audioRef} src={props.src} />
        </div>
    );
}

export default MP3Player;