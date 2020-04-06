'use strict';

// GET ELEMENTS

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const playBtn = player.querySelector('.toggle');
const skipBtns = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


// FUNCTIONS

function togglePlay() {
    video.paused ? video.play() : video.pause();
}

// Update play/pause button:
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    playBtn.textContent = icon;
}

// Skip buttons:
function skip() {
    console.log('skipped!');
    video.currentTime += parseFloat(this.dataset.skip);
}

// Volume and speed:
function handleRangeUpdate() {
    video[this.name] = this.value;
    console.log(this.name);
    console.log(this.value);
}

// Progress bar:
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    let scrubtime = (e.offsetX/progress.offsetWidth) * video.duration; 
    video.currentTime = scrubtime;
}

// HOOK UP EVENT LISTENERS

// Play/pause:
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

playBtn.addEventListener('click', togglePlay);

// Skip:
skipBtns.forEach(button => button.addEventListener('click', skip));

// Ranges:
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
// ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// Progress bar constant update:
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);
//Now for the drag:
let mousedown = false;
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);