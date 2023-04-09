import { useEffect, useState } from 'react';
import logo from '../../imgs/logo.svg';
import uploadImg from '../../imgs/uploadImg.png';
import musicIcon from '../../imgs/musicIcon.svg';
import musicActive from '../../imgs/musicActive.svg';
import refresh from '../../imgs/refresh.svg';
import { Upload, message } from 'antd';
import './style.css'; // 导入组件样式


const Header = (props) => {
    const [currentIcon, setCurrentIcon] = useState(musicIcon);

    const showIcon = () => {
        // 正在播放，可以刷新
        if (props.isPlaying) {
            setCurrentIcon(refresh);
        }
        if (props.musicList.length > 0) {
            setCurrentIcon(musicActive);
        }
        if (props.inputMode) {
            setCurrentIcon(musicIcon);
        }
    };

    const uploadProps = {
        name: 'file',
        action: 'http://39.103.151.105:64641/fileUpload',
        showUploadList: false,
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                console.log(info.file.response)
                props.setImgName(info.file.response);
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    useEffect(() => {
        showIcon();
    }, [props]);

    return (
        <div className="header">
            <img src={logo} alt="logo" className='logo' />
            <div className="bar">
                <Upload {...uploadProps}>
                    <img src={uploadImg} alt="uploadImg" className='icon' />
                </Upload>
                <div className="musicIcon">
                    <img
                        src={currentIcon}
                        alt="musicIcon"
                        className={props.musicList.length > 0 ? 'iconEnter' : 'iconNotEnter'}
                        onClick={() => {
                            // 已经播放，点击切换音乐
                            if (props.isPlaying) {
                                // TODO
                                return
                            }

                            if (props.musicList.length > 0) {
                                props.setIsPlaying(!props.isPlaying);
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;