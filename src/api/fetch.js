export async function getVideosList(videoCategoryId = "", maxResults = 48) {

    //use this to make url request unique always so that it can fetch new responses
    let randomNumber        = Math.floor(Math.random() * 1000000);
    videoCategoryId         = (videoCategoryId == "") ? "" : `&videoCategoryId=${videoCategoryId}`;
    
    let mostPopularVideos   = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=${maxResults}${videoCategoryId}&regionCode=IN&key=${ process.env.YOUTUBE_API_KEY }&random=${randomNumber}`;
    let ajaxURL         = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,statistics&maxResults=50&playlistId=RDCMUCNJcSUSzUeFm8W9P7UUlSeQ&key=${ process.env.YOUTUBE_API_KEY }`;
    let searchYoutubeURL = `https://www.googleapis.com/youtube/v3/search?maxResults=20&type=video&order=date&part=snippet&key=${ process.env.YOUTUBE_API_KEY }`;
    let youtubeChannelURL = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=UCpwix-O6ceqMgdxhqIynzFA&key=${ process.env.YOUTUBE_API_KEY }`;
    console.log(mostPopularVideos);
    const res = await fetch(mostPopularVideos, { next: { revalidate: 10 } })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      //throw new Error('Failed to fetch data')
      return false;
    }
   
    return res.json();
  
  }
  
  
export async function getChannelDetails(channelID) {

  let youtubeChannelURL = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${ channelID }&key=${ process.env.YOUTUBE_API_KEY }`;

  const res = await fetch(youtubeChannelURL, { next: { revalidate: 10 } })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    //throw new Error('Failed to fetch data')
    return false;
  }
  
  return res.json();
  
}
  



export async function getVideoDetails(videoID) {
  const url   = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoID}&key=${ process.env.YOUTUBE_API_KEY }`;
  const res = await fetch(url, { next: { revalidate: 10 } })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    //throw new Error('Failed to fetch data')
    return false;
  }
 
  return res.json();
}