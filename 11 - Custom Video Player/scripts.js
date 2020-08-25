//get our elements
const player = document.querySelector('player');
//const video = player.querySelector('.viewer');
const video = document.querySelector('.viewer');
const progress = document.querySelectorAll('.progress');
const progressBar = document.querySelectorAll('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');



//build our functions
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
};

function updateButton() {
    const icon = this.paused ? '?' : '? ?';
    toggle.textContent = icon;
};

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
};

function handleRangeUpdate() {
    video[this.name] = this.value;
    //console.log(this.name);
    //console.log(this.value);
};

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
};

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
};

//hook up event listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
progress.addEventListener('click', scrub);