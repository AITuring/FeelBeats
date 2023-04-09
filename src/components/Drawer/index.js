import './style.css';
import ColorList from '../../color.js';
const Drawer = (props) => {

    return (
        <div className="drawer">
            {
                props.history.map(item => {
                    return <div
                        key={item.id}
                        className='itemBg'
                        style={{
                            background: `linear-gradient(to bottom,${item.bgColor} , #efefef)`
                        }}
                        onClick={() => {
                            props.setIsPlaying(true);
                            props.setCurrentMusic(`http://39.103.151.105:64641/music?fileName=${item.musicName}`);
                            props.setWords(item.text);
                            props.setImgName(item.imgPath);
                            const res = ColorList.find(v => v.name.includes(item.emotionTag));
                            if (res) {
                                props.setEmotion(res);
                            } else {
                                // 无感
                                props.setEmotion(ColorList[1]);
                            }
                            props.setShowDrawer(false);

                        }}
                    >
                        <div className='itemTime'>{item.time}</div>
                        <div className='itemText'>{item.text}</div>
                    </div>
                })
            }
        </div>
    );
}

export default Drawer;