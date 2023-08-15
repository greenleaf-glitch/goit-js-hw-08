import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const pageLeave = document.querySelector('a');

const player = new Vimeo(iframe);

player.setVolume(0.6);

let currentPlayTime;

const onPlay = function (data) {
  currentPlayTime = JSON.stringify(data.seconds);
  localStorage.setItem('videoplayer-current-time', currentPlayTime);
};

player.on('timeupdate', throttle(onPlay, 1000));

try {
  const currentPlayTimeReceived = JSON.parse(
    localStorage.getItem('videoplayer-current-time')
  );
  player.setCurrentTime(currentPlayTimeReceived);
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}

pageLeave.addEventListener('click', () => {
  localStorage.removeItem('videoplayer-current-time');
});
