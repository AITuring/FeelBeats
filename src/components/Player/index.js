import React, { useState, useRef, useEffect } from 'react';
import './style.css'; // 导入组件样式

function MP3Player(props) {
    const audioRef = useRef(null); // 用于引用audio元素

    // 播放/暂停按钮的点击处理函数
    const handlePlayPauseClick = () => {
        if (props.disabled) {
            // input模式无法播放音乐
            return;
        }
        if (props.isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        props.setIsPlaying(!props.isPlaying);
    };

    useEffect(() => {
        if (props.isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [props.isPlaying]);

    return (
        <div className='record'>
            <div className={props.isPlaying ? "needle" : "stop"} onClick={handlePlayPauseClick}></div>
            <div className="center">
                <div
                    className="cover"
                    onClick={handlePlayPauseClick}
                    style={{
                        background: props.coverColor ? props.coverColor : '#efefef',
                    }}
                >
                </div>
            </div>
            <audio ref={audioRef} src={props.src} />
        </div>
    );
}

export default MP3Player;