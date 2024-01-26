
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { getVideosList, getChannelDetails } from "@/api/fetch";
import { viewsInMK, durationToHHMMSS, timePassedFromISO } from '@/_utils/utils'
import Link from 'next/link'
import '/public/assets/css/videosList.min.css';

export default async function VideosList(props){

    let excludeVideoId    = props.excludeVideoId;
    let videosList        = await getVideosList(props.videoCategoryId, props.maxResults);
    videosList            = videosList ? videosList.items : youtubeFeedLocalJSON.items;
  
    return (
        <div className="videos-list"> {
                videosList.map(async (video) => {
  
                    if (video.id != excludeVideoId){
                      
                      let channelDetails  = await getChannelDetails(video.snippet.channelId);
                      channelDetails      = channelDetails ? channelDetails.items[0] : channelsListLocalJSON.items.find((channel) => {
                        return channel.id === video.snippet.channelId;
                      });
                  
                      return (
                          
                            <div className='video-card' key={video.id}>
                              <Link href={`/video/${video.id}`}>
                              <div className='image' style={{ backgroundImage: `url( ${ video.snippet.thumbnails.high.url } )` }}>
                                <div className='duration'>{ durationToHHMMSS(video.contentDetails.duration) }</div>
                              </div>
                              <div className='video-details'>
                                <div className='author-dp' style={{ backgroundImage: `url( ${ JSON.stringify(channelDetails.snippet.thumbnails.medium.url) }  )` }}></div>
                                <div className='details'>
                                  <div className='title'>{ video.snippet.title }</div>
                                  <div className='other'>
                                    { video.snippet.channelTitle }<div className='divider'></div> 
                                    { viewsInMK(video.statistics.viewCount) } views<div className='divider'></div> 
                                    { timePassedFromISO(video.snippet.publishedAt) }
                                  </div>
                                </div>
                                <div className='video-menu'><FontAwesomeIcon icon={faEllipsisVertical} className='icon' /></div>
                              </div>
                              </Link>
                            </div>
                        );
                    }
                  })
            } </div>
    );
  }