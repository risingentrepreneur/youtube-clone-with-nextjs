import VideoPlayer from "./videoPlayer";
import { parseHTMLtags } from '@/_utils/utils'
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

  const parsedDescription     = parseHTMLtags(videoDetails.description);

  return (
    <div className="video-description">
      <h4 className="title">{ videoDetails.title }</h4>
      <div className="description" dangerouslySetInnerHTML={{ __html: parsedDescription }} />
    </div>
  );
}