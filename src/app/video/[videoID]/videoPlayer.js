"use client"
import { useParams } from 'next/navigation';
import YouTube from "react-youtube";

export default function VideoPlayer() {

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
      <div className='youtube-player'>
        <YouTube
          videoId={videoID}
          className='iframe-player'
          onStateChange={(e) => checkElapsedTime(e)}
          opts={opts}
        />
      </div>
    );
}
  
  