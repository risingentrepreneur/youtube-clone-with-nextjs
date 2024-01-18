"use client"
import { useParams } from 'next/navigation';
import YouTube from "react-youtube";
import { parseHTMLtags } from '@/_utils/utils';
import DOMPurify from "dompurify";

export function VideoPlayer() {

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



export function Details( { videoDetails } ){

  const parsedDescription       = parseHTMLtags(videoDetails.description);
  const sanitizedDescription    = DOMPurify.sanitize(parsedDescription);
  return (
    
    <div className="video-description">
      <h4 className="title">{ videoDetails.title }</h4>
      <div className="description" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
    </div>
  );
}
  
  