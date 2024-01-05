import TopBar from '@/components/header'
import Image from 'next/image'
import styles from '/public/assets/css/page.module.min.css'
import topics from '/src/api/topics.json'
import youtubeFeedLocalJSON from '/src/api/youtubefeed.json'
import channelsListLocalJSON from '/src/api/channelsList.json'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser, faCompass } from "@fortawesome/free-regular-svg-icons";


export default function Home() {
  return (
    <main className={styles.main}>
      <TopBar />
      <NavigationMenuAndTopics />
      <VideosList />
    </main>
  )
}



function NavigationMenuAndTopics(){

  function TopicList(){
    return topics.map((topic, key) => {
      const useClassName  = (topic == "All") ? "topic-tag active" : "topic-tag";
      return <span key={key} className={ useClassName }>{ topic }</span>;
    });
  }
  
  return (
    <div className = "navigation-menu-and-topics">
      <div className='menu-icon'>
        <FontAwesomeIcon icon={faCompass} className='icon'/>
      </div>
      <TopicList />
    </div>
  );
}

async function VideosList(){

  let videosList    = await getVideoPlaylistItems();
  videosList        = videosList ? videosList.items : youtubeFeedLocalJSON.items;

  return videosList.map(async (video) => {

    let channelDetails  = await getChannelDetails(video.snippet.channelId);
    channelDetails      = channelDetails ? channelDetails.items[0] : channelsListLocalJSON.items.find((channel) => {
      return channel.id === video.snippet.channelId;
    });

    return (
        <div key={ video.id } className='video-card'>
            <div className='image' style={{ backgroundImage: `url( ${ video.snippet.thumbnails.high.url } )` }}>
              <div className='duration'>{ convertDurationStringToHHMMSS(video.contentDetails.duration) }</div>
            </div>
            <div className='video-details'>
              <div className='author-dp' style={{ backgroundImage: `url( ${ JSON.stringify(channelDetails.snippet.thumbnails.medium.url) }  )` }}></div>
              <div className='details'>
                <div className='title'>{ video.snippet.title }</div>
                <div className='other'>
                  { video.snippet.channelTitle } &nbsp;॰&nbsp; { internalPatternNumber(video.statistics.viewCount) } views &nbsp;॰&nbsp; { condenseTimePassed(video.snippet.publishedAt) }
                </div>
              </div>
              <div className='video-menu'><FontAwesomeIcon icon={faEllipsisVertical} className='icon' /></div>
            </div>
        </div>
      );
  });
}



async function getVideoPlaylistItems() {
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


async function getChannelDetails(channelID) {
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


function internalPatternNumber(number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M'; // Use toFixed(1) for one decimal place
  } else if (number >= 1000) {
    return (number / 1000).toFixed(0) + 'K';
  } else {
    return number; // Return the original number if less than 1000
  }
}

function convertDurationStringToHHMMSS(durationString) {
  const matches = durationString.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);

  if (!matches) {
      return "00:00:00";
  }

  const hours = matches[1] ? parseInt(matches[1]) : 0;
  const minutes = matches[2] ? parseInt(matches[2]) : 0;
  const seconds = matches[3] ? parseInt(matches[3]) : 0;

  // Format hours, minutes, and seconds as two-digit strings with leading zeros
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

function condenseTimePassed(isoString) {
  const timestamp = new Date(isoString).getTime();
  const currentTime = Date.now();
  const timePassedInSeconds = currentTime - timestamp;

  // Calculate years, months, days, hours, minutes, and seconds
  const years = Math.floor(timePassedInSeconds / (365 * 24 * 60 * 60 * 1000));
  const remainingMonths = Math.floor((timePassedInSeconds % (365 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000));
  const days = Math.floor((timePassedInSeconds % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
  const hours = Math.floor((timePassedInSeconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((timePassedInSeconds % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timePassedInSeconds % (60 * 1000)) / 1000);

  // Determine and format the most significant unit
  let mainUnit = "";
  let mainValue = 0;
  if (years > 0) {
      mainUnit = "year";
      mainValue = years;
  } else if (remainingMonths > 0) {
      mainUnit = "month";
      mainValue = remainingMonths;
  } else if (days > 0) {
      mainUnit = "day";
      mainValue = days;
  } else if (hours > 0) {
      mainUnit = "hour";
      mainValue = hours;
  } else if (minutes > 0) {
      mainUnit = "minute";
      mainValue = minutes;
  } else {
      mainUnit = "second";
      mainValue = seconds;
  }

  // Format and return the concise time passed
  return `${mainValue} ${mainUnit}${mainValue > 1 ? "s" : ""} ago`;
}


