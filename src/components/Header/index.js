import logo from '../../imgs/logo.svg';
import uploadImg from '../../imgs/uploadImg.png';
import musicIconBg from '../../imgs/musicIconBg.png';
import musicIcon from '../../imgs/musicIcon.svg';
import './style.css'; // 导入组件样式

const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt="logo" className='logo'/>
            <div className="bar">
                <img src={uploadImg} alt="uploadImg" className='icon' />
                <img src={musicIconBg} alt="musicIconBg" className='icon' />
                {/* <img src={musicIcon} alt="musicIcon" /> */}
            </div>
        </div>
    );
};

export default Header;