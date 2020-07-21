const toggle_button = document.querySelector('.toggle');
const video = document.querySelector('video');
const buffered = document.querySelector('.buffered');
const bufferZone = document.querySelector('.bufferZone');
const videoDetails = document.querySelector('.video_details');
let videoControls = document.querySelector('.videoControls');
let videoPlayer = document.querySelector('.videoPlayer');

video.addEventListener('timeupdate', updateTheProgressBar);

function updateTheProgressBar() {
    const currentBufferPosition = (video.currentTime / video.duration) * 100;
    buffered.style.width = ` ${currentBufferPosition}% `;
}

video.addEventListener('click', Toggle);

toggle_button.addEventListener('click',Toggle);

function Toggle(){ video.paused ? video.play() : video.pause() };

video.addEventListener('playing',()=>{
    toggle_button.textContent = "\u23F8";
})

video.addEventListener('pause',()=>{
    toggle_button.textContent = '\u25BA';
})

video.addEventListener('mouseenter', showControls);
video.addEventListener('mouseleave', hideControls);
videoDetails.addEventListener('mouseenter', showControls);
videoDetails.addEventListener('mouseleave', hideControls);

function showControls(){
    videoControls.style.display = 'flex';
    videoControls.style.height = '20px';
    videoDetails.style.transform = 'translateY(-35px)';
    bufferZone.style.height = '15px';
}

function hideControls(){
    videoDetails.style.transform = 'translateY(0px)';
    videoControls.style.display = 'none';
    bufferZone.style.height = '5px';
}

const inputs = document.querySelectorAll('input[type="range"]');

inputs.forEach(input => {
    input.addEventListener('change',function(){
        video[this.name] = this.value;
    })
})



const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click',skip)
})

function skip() {
    if(this.dataset.skip)
    video.currentTime+= parseInt(this.dataset.skip);
}


bufferZone.addEventListener('click', (e)=> {
    video.currentTime =  (e.offsetX / bufferZone.clientWidth ) * video.duration;
});


document.querySelector('#fullscreen').addEventListener('click', ()=> {
    if(document.querySelector('#fullscreen').textContent === '\uF5D5'){
        video.style.width = '850px';
        videoDetails.style.marginTop = '-4px';
        videoDetails.style.width = '850px';
        videoControls.style.display = 'none';
        videoDetails.style.transform = 'translateY(0px)';
        document.querySelector('#fullscreen').textContent = '';
        document.querySelector('#fullscreen').textContent = '\u26F6';
        console.log('\uF5D5');
    }else{
        video.style.width = '100%';
        videoDetails.style.marginTop = '-115.3px';
        videoDetails.style.width = '100%';
        videoControls.style.display = 'flex';
        videoDetails.style.transform = 'translateY(0px)';
        document.querySelector('#fullscreen').textContent = '\uF5D5'
    }
})