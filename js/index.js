const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenButton = player.querySelector('.fullscreen');

function togglePlay() {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
}

function updatePlayButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
}

function skip() {
	const timeToSkip = parseFloat(this.dataset.skip);
	video.currentTime += timeToSkip;
}

function handleRangeUpdate() {
	const propertyToUpdate = this.name;
	video[propertyToUpdate] = this.value;
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function changeVideoTime(e) {
	const videoTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = videoTime;
}

function makeFullScreen() {
	const rfs = video.requestFullScreen
		|| video.webkitRequestFullScreen
		|| video.mozRequestFullScreen
		|| video.msRequestFullscreen;

	rfs.call(video);
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
fullscreenButton.addEventListener('click', makeFullScreen);

let mouseDown = false;
progress.addEventListener('click', changeVideoTime);
progress.addEventListener('mousemove', (e) => mouseDown && changeVideoTime(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);


