
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

let PLAYBACK_TIME = 'videoplayer-current-time';

const onPlay = function (data) {
  localStorage.setItem(PLAYBACK_TIME, JSON.stringify(data.seconds));
};

player.on('timeupdate', throttle(onPlay, 1000));

const storedTime = localStorage.getItem(PLAYBACK_TIME);

player
  .setCurrentTime(storedTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });