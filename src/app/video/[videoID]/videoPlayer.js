"use client"
import { useParams } from 'next/navigation';
import YouTube from "react-youtube";

export default function Content() {

    const { videoID } = useParams();
    

    const checkElapsedTime = (e) => {
      //console.log(e.target.playerInfo.playerState);
      const duration = e.target.getDuration();
      const currentTime = e.target.getCurrentTime();
      if (currentTime / duration > 0.95) {
        //setModalIsOpen(true);
      }
    };
  
    const opts = {
      playerVars: {
        autoplay: 1
      }
    };
    
  
    return (
      <div>
        <div>
          <div>
            <YouTube
              videoId={videoID}
              className='youtube-player'
              onStateChange={(e) => checkElapsedTime(e)}
              opts={opts}
            />
          </div>
        </div>
      </div>
    );
}
  
  