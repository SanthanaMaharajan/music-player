let audios=document.querySelectorAll("audio");
let playBtn=document.getElementById("play-btn");
let backwardBtn=document.getElementById("backward-btn");
let forwardBtn=document.getElementById("forward-btn");
let prevBtn=document.getElementById("prev-btn");
let nextBtn=document.getElementById("next-btn");
let musicSlider=document.getElementById("music-slider");
let musicCountdown=document.getElementById("music-countdown");
let musicDuration=document.getElementById("music-duration");
let volumeRange=document.getElementById("volume");
let muteBtn=document.getElementById("mute-btn");
let musicDetails=document.getElementById("musicDetails");
let i=0;


//play or pause function
function playPause(){
    if(audios[i].paused){
       audios[i].play();
       playBtn.innerHTML="<i class='bi bi-pause-circle'></i>"
       audioDuration();
       timer=setInterval(audioCountDown,1000);
       audios[i].addEventListener("ended",function(){
        audios[i].pause();
        nextAudio();
    });
    }else{
        audios[i].pause();
        playBtn.innerHTML="<i class='bi bi-play-circle'></i>";
    }
 }

// 5 sec backward function
 function backwards(){
    audios[i].currentTime-=5;
}

//5 sec forward function
function forwards(){
    audios[i].currentTime+=5;
}

// next song function
function nextAudio(){
    audios[i].pause();
    i++;
    if (i>=audios.length) {
      i=0;
    }
    audios[i].currentTime=0;
    playPause();
    updateMusicDetails();
    console.log(i);
}

// previous song function
function prevAudio(){
    audios[i].pause();
    i--;
    if (i<0) {
      i=audios.length-1;
    }
    audios[i].currentTime=0;
    playPause();
    updateMusicDetails();
    console.log(i); 
}

// muteUnmute function
function muteUnmute(){
    if(audios[i].muted) {
      audios[i].muted = false;
      muteBtn.innerHTML="<i class='bi bi-volume-up-fill'></i>";
      volumeRange.value=audios[i].volume*100;
    }else{
        audios[i].muted=true;
        muteBtn.innerHTML="<i class='bi bi-volume-mute-fill'></i>";
        volumeRange.value=0;
    } 
}

// duration calculation function
function audioDuration(){
    let durMinutes = Math.floor(audios[i].duration/60);
    let durSeconds = Math.round(audios[i].duration%60);
    musicDuration.innerHTML = durMinutes + ":" + ((durSeconds < 10)? "0" : "") + durSeconds;     
}

// duration countdown calculation
function audioCountDown(){
    let currentTime = audios[i].currentTime;
    let minutes = Math.floor(currentTime / 60);
    let seconds = Math.round(currentTime % 60);
    musicCountdown.innerHTML = minutes + ":" + ((seconds < 10)? "0" : "") + seconds;
    updateSlider();    
}

// progress bar slider functions
function updateSlider(){
    let sliderTime = (audios[i].currentTime*100) / audios[i].duration;  
    musicSlider.value = sliderTime;
}

// slider change duration function
musicSlider.addEventListener("change",function(){
    clearInterval(timer);
    let setTime=(musicSlider.value*(audios[i].duration)/100);
    audios[i].currentTime=setTime;
    timer=setInterval(audioCountDown,500);
});

// volume update function
function volumeUpdate(){
    let volumeInput = volumeRange.value;
    if(volumeInput==0){
        audios[i].muted=true;
        muteBtn.innerHTML="<i class='bi bi-volume-mute-fill'></i>";
    }else{
        audios[i].volume = volumeInput/100;
        audios[i].muted=false;
        muteBtn.innerHTML="<i class='bi bi-volume-up-fill'></i>";
    }
}

//Music title update function
function updateMusicDetails(){
    let fileName=audios[i].getAttribute("src");
    fileName=fileName.replace("files/","");
    musicDetails.innerHTML=fileName ;
}



playBtn.addEventListener( "click",playPause);
backwardBtn.addEventListener("click",backwards);
forwardBtn.addEventListener("click",forwards);
nextBtn.addEventListener("click",nextAudio);
prevBtn.addEventListener("click",prevAudio);
volumeRange.addEventListener("change",volumeUpdate);
muteBtn.addEventListener("click",muteUnmute);


