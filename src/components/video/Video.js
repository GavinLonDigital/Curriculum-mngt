import {useParams} from 'react-router-dom';
import ReactPlayer from 'react-player';
import './Video.css';

const Video = () => {
    let params = useParams();
    let key = params.ytId;
  return (
    <div className="react-player-container">
        {(key!=null)?
            <ReactPlayer controls="true" playing={true} url = {`https:/www.youtube.com/watch?v=${key}`}
            width = '100%' height='100%' />
            :null
        }
        
    </div>
  )
}

export default Video
