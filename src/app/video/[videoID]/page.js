import VideoPlayer from "./videoPlayer";


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
    <div className="video-description">
      <h4 className="title">{ videoDetails.title }</h4>
      <div className="description">{ videoDetails.description }</div>
    </div>
  );
}

async function getVideoDetails(videoID) {
  const url   = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoID}&key=${ process.env.YOUTUBE_API_KEY }`;
  const res = await fetch(url)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    //throw new Error('Failed to fetch data')
    return false;
  }
 
  return res.json();
}