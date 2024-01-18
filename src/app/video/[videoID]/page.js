import {VideoPlayer, Details} from "./videoDetails";
import '/public/assets/css/videoPage.min.css'
import { getVideoDetails } from "@/api/fetch";


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
  videoDetails          = videoDetails.items[0].snippet;

  return (
    <div>
      <VideoPlayer />
      <Details videoDetails={ videoDetails } />
    </div>
  )
}