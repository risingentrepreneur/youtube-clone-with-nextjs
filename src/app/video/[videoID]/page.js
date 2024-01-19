import {VideoPlayer, Details, ChannelDetails, LikesDislikes} from "./videoDetails";
import '/public/assets/css/videoPage.min.css'
import { getVideoDetails, getChannelDetails } from "@/api/fetch";
import VideosList from '@/_components/videosList'


export async function generateMetadata({ params }) {
  // read route params

  let videoID           = params.videoID;
  let videoDetails      = await getVideoDetails(videoID);
  videoDetails          = videoDetails.items[0].snippet;
  return {
    title: videoDetails.title,
    description: videoDetails.description,
  }
}

export default async function Video({ params })  {

  let videoID           = params.videoID;
  let videoDetails      = await getVideoDetails(videoID);
  videoDetails          = videoDetails.items[0];
  let channelDetails    = await getChannelDetails(videoDetails.snippet.channelId);
  channelDetails        = channelDetails.items[0];

  return (
    <div className="video-page">
      <VideoPlayer />
      <Details videoDetails = { videoDetails } />
      <ChannelDetails channelDetails = { channelDetails } />
      <LikesDislikes videoDetails = { videoDetails } />
      <div className='video-list'> <VideosList videoCategoryId = { videoDetails.snippet.categoryId } maxResults = "20" /> </div>
    </div>
  )
}