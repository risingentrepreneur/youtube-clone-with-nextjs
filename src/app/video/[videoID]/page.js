import {VideoPlayer, Details} from "./videoDetails";
import '/public/assets/css/videoPage.min.css'
import { getVideoDetails } from "@/api/fetch";

export default function Video({ params })  {

    return (
      <>
        <VideoPlayer />
        <PrintVideoDetails videoID={params.videoID}/>
      </>
    )
}

async function PrintVideoDetails({ videoID }){

  let videoDetails      = await getVideoDetails(videoID);
  videoDetails          = videoDetails.items[0].snippet;

  return (
    <Details videoDetails={ videoDetails } />
  );
}