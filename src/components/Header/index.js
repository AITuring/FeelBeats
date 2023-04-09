import logo from '../../imgs/logo.svg';
import uploadImg from '../../imgs/uploadImg.png';
import musicIcon from '../../imgs/musicIcon.svg';
import musicActive from '../../imgs/musicActive.svg';
import refresh from '../../imgs/refresh.svg';
import './style.css'; // 导入组件样式

const Header = (props) => {
    return (
        <div className="header">
            <img src={logo} alt="logo" className='logo'/>
            <div className="bar">
                <img src={uploadImg} alt="uploadImg" className='icon' />
                <div className="musicIcon">
                    <img
                        src={props.musicList.length > 0 ? musicActive : musicIcon}
                        alt="musicIcon"
                        className={props.musicList.length > 0 ? 'iconEnter' : 'iconNotEnter'}
                        onClick={() => {
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