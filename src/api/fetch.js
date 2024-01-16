export async function getVideosList() {
    let mostPopularVideos   = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${ process.env.YOUTUBE_API_KEY }`;
    let ajaxURL         = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,statistics&maxResults=50&playlistId=RDCMUCNJcSUSzUeFm8W9P7UUlSeQ&key=${ process.env.YOUTUBE_API_KEY }`;
    let searchYoutubeURL = `https://www.googleapis.com/youtube/v3/search?maxResults=20&type=video&order=date&part=snippet&key=${ process.env.YOUTUBE_API_KEY }`;
    let youtubeChannelURL = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=UCpwix-O6ceqMgdxhqIynzFA&key=${ process.env.YOUTUBE_API_KEY }`;
    const res = await fetch(mostPopularVideos)
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
    let youtubeChannelURL = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${ channelID }&key=${ process.env.YOUTUBE_API_KEY }`;
  
    const res = await fetch(youtubeChannelURL)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      //throw new Error('Failed to fetch data')
      return false;
    }
   
    return res.json();
  
  }
  