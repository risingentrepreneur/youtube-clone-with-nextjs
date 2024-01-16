
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { getVideosList, getChannelDetails } from "@/api/fetch";
import { viewsInMK, durationToHHMMSS, timePassedFromISO } from '@/_utils/utils'
import Link from 'next/link'

export default async function VideosList(){

    let videosList    = await getVideosList();
    videosList        = videosList ? videosList.items : youtubeFeedLocalJSON.items;
  
    return videosList.map(async (video) => {
  
      let channelDetails  = await getChannelDetails(video.snippet.channelId);
      channelDetails      = channelDetails ? channelDetails.items[0] : channelsListLocalJSON.items.find((channel) => {
        return channel.id === video.snippet.channelId;
      });
  
      return (
          <Link href={`video/${video.id}`} key={video.id}>
            <div className='video-card'>
              <div className='image' style={{ backgroundImage: `url( ${ video.snippet.thumbnails.high.url } )` }}>
                <div className='duration'>{ durationToHHMMSS(video.contentDetails.duration) }</div>
              </div>
              <div className='video-details'>
                <div className='author-dp' style={{ backgroundImage: `url( ${ JSON.stringify(channelDetails.snippet.thumbnails.medium.url) }  )` }}></div>
                <div className='details'>
                  <div className='title'>{ video.snippet.title }</div>
                  <div className='other'>
                    { video.snippet.channelTitle } &nbsp;॰&nbsp; { viewsInMK(video.statistics.viewCount) } views &nbsp;॰&nbsp; { timePassedFromISO(video.snippet.publishedAt) }
                  </div>
                </div>
                <div className='video-menu'><FontAwesomeIcon icon={faEllipsisVertical} className='icon' /></div>
              </div>
            </div>
          </Link>
        );
    });
  }