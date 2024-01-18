"use client"
import { useParams } from 'next/navigation';
import YouTube from "react-youtube";
import { durationToHHMMSS, parseHTMLtags, timePassedFromISO, viewsInMK } from '@/_utils/utils';
import DOMPurify from "dompurify";
import { useEffect, useState } from 'react';

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
    const [showDescription, setShowDescription]           = useState(false);

    const toogleDescriptionView = () => {
        setShowDescription(!showDescription);
    };

    const snippet                   = videoDetails.snippet;
    const statistics                = videoDetails.statistics;
    const parsedDescription         = parseHTMLtags(snippet.description);
    const sanitizedDescription      = DOMPurify.sanitize(parsedDescription);

    return (
        
        <div className="video-description">
            <h4 className="title">{ snippet.title }</h4>
            <div className='statistics'>
                { viewsInMK(statistics.viewCount) } views ॰&nbsp;
                { viewsInMK(statistics.commentCount) } comments ॰&nbsp; 
                { timePassedFromISO(snippet.publishedAt) }
                <div className={!showDescription ? "show-more-btn show" : "show-more-btn hidden"} onClick={toogleDescriptionView}>...more</div>
            </div>
            <div className={showDescription ? "description show" : "description hidden"} dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
            <div className={showDescription ? "show-less-btn show" : "show-less-btn hidden"} onClick={toogleDescriptionView}>...less</div>
        </div>
    );
}
  
export function ChannelDetails( { channelDetails } ){
    return (
        <div className='channel-details'>
            <div className='left'>
                <div className='channel-dp' style={{ backgroundImage: `url( ${ JSON.stringify(channelDetails.snippet.thumbnails.medium.url) }  )` }}></div>
                <div className='title'> { channelDetails.snippet.title } </div>
                <div className='subscribers-count'> { viewsInMK(channelDetails.statistics.subscriberCount) } </div>
            </div>
            <div className='subscribe-btn'>
                Subscribe
            </div>
        </div>
    );
}
  