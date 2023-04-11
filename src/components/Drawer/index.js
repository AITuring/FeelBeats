import './style.css';
import ColorList from '../../color.js';
const covertTime = (isoDateString) => {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    const formattedDateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateString;
}
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
                            props.setCurrentMusic(`http://39.103.151.150:64641/api/music?fileName=${item.musicName}`);
                            props.setWords(item.text);
                            // props.setImgName(item.imgPath);
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
                        <div className='itemTime'>{covertTime(item.updateDate)}</div>
                        <div className='itemText'>{item.text}</div>
                    </div>
                })
            }
        </div>
    );
}

export default Drawer;