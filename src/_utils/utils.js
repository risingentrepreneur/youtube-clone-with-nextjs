export function viewsInMK(number) {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M'; // Use toFixed(1) for one decimal place
    } else if (number >= 1000) {
      return (number / 1000).toFixed(0) + 'K';
    } else {
      return number; // Return the original number if less than 1000
    }
}
  
export function durationToHHMMSS(durationString) {
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
  
    return `${(formattedHours !== "00") ? formattedHours + ":" : ""}${formattedMinutes}:${formattedSeconds}`;
}
  
export function timePassedFromISO(isoString) {
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
  
export function parseHTMLtags(string){
    const Rexp = /((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g;
 
    // Replace the RegExp content by HTML element
    //return string.replace(Rexp, `<a href='$1'>$1</a>`);

    return string.replace(/(https?:\/\/[^\s]+)/g, (url) => {
        return `<a href="${url}" class="link-color" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });

}