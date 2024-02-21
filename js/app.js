let tracks=[
    {
        name:"01. Journey (From 'Jaanu')",
        artist: "Pradeep Kumar",
        path:"new-files/Journey-MassTamilan.fm.mp3",
        image:"new-files/jaanu-tamil-2020.webp"
    },
    {
        name:"02. The Life Of Ram",
        artist: "Govind Vasantha, Pradeep Kumar",
        path:"new-files/The_Life_Of_Ram-MassTamilan.com.mp3",
        image:"new-files/96-2018.webp"
    },
    {
        name:"03. Yaar Azhaippadhu",
        artist: "Sid Sriram, Ghibran",
        path:"new-files/Yaar-Azhaippadhu-MassTamilan.fm.mp3",
        image:"new-files/maara-tamil-2021.webp"
    },
    {
        name:"04. Jolly O Gymkhana",
        artist: "Vijay, Anirudh Ravichander",
        path:"new-files/Jolly-O-Gymkhana-MassTamilan.so.mp3",
        image:"new-files/beast-tamil-2022.webp"
    },
    {
        name:"05. Ullaallaa",
        artist: "Nakash Aziz, Inno Genga",
        path: "new-files/Ullaallaa-MassTamilan.org.mp3",
        image:"new-files/petta-2018.webp"
    },
    {
        name:"06. Aagasam",
        artist: "G.V. Prakash Kumar, Christin Jos, Govind",
        path:"new-files/Aagasam-MassTamilan.io.mp3",
        image:"new-files/soorarai-pottru-2020.webp"
    },
    {
        name:"07. En Iniya Thanimaye",
        artist: "D. Imman, Sid Sriram",
        path:"new-files/En-Iniya-Thanimaye-MassTamilan.io.mp3",
        image:"new-files/teddy-2020.webp"
    },
    {
        name:"08. Pala Palakura",
        artist: "Hariharan",
        path:"new-files/Pala-Palakura.mp3",
        image:"new-files/ayan.webp"
    },
    {
        name:"09. Damakku Damakku",
        artist:" Harris Jayaraj, Benny Dayal",
        path:"new-files/Damakku-Damakku-MassTamilan.dev.mp3",
        image:"new-files/aadhavan-tamil-2009.webp"
    },
    {
        name:"10. Boomi Enna Suthudhe",
        artist: "Anirudh",
        path:"new-files/Boomi-Enna-Suthudhe.mp3",
        image:"new-files/ethir-neechal.webp"
    }
];

let image=document.getElementById("song-img");
let songName=document.getElementById("song-title");
let artist=document.getElementById( "artist");
let audio= document.createElement("audio") ;
let playBtn=document.getElementById("play-btn");
let loopBtn=document.getElementById("loop-btn");
let shuffleBtn=document.getElementById("shuffle-btn");
let prevBtn=document.getElementById("prev-btn");
let nextBtn=document.getElementById("next-btn");
let musicSlider=document.getElementById("music-slider");
let musicCountdown=document.getElementById("music-countdown");
let musicDuration=document.getElementById("music-duration");
let volumeRange=document.getElementById("volume");
let muteBtn=document.getElementById("mute-btn");
let musicDetails=document.getElementById("musicDetails");
let i=0;



function loadSong(){
    let song= tracks[i];
    songName.innerHTML = song.name;
    artist.innerHTML = song.artist;
    audio.setAttribute( "src" , song.path); 
    image.src= `${song.image}`;
}

function playPause(){
    if(audio.paused){
        audio.play();
        playBtn.innerHTML="<i class='bi bi-pause-circle'></i>"
        setInterval(audioDuration,500);
        audio.addEventListener("ended",function(){
            nextAudio();
        });
    }else{
        audio.pause();
        playBtn.innerHTML="<i class='bi bi-play-circle' ></i>";
    }
}

function nextAudio(){
    if(audio.loop) {
        audio.removeAttribute('loop');
        loopBtn.innerHTML="<i class='bi bi-repeat'></i>";
    }
    i++;
    if (i>=tracks.length) {
      i=0;
    }
    audio.currentTime=0;
    loadSong();
    playPause();
}

function prevAudio(){
    if(audio.loop) {
        audio.removeAttribute('loop');
        loopBtn.innerHTML="<i class='bi bi-repeat'></i>";
    }
    i--;
    if (i<0) {
      i=tracks.length-1;
    }
    audio.currentTime=0;
    loadSong();
    playPause();
}


function muteUnmute(){
    if(audio.muted) {
      audio.muted = false;
      muteBtn.innerHTML="<i class='bi bi-volume-up-fill'></i>";
      volumeRange.value=audio.volume*100;
    }else{
        audio.muted=true;
        muteBtn.innerHTML="<i class='bi bi-volume-mute-fill'></i>";
        volumeRange.value=0;
    } 
}

function volumeUpdate(){
    let volumeInput = volumeRange.value;
    if(volumeInput==0){
        audio.muted=true;
        muteBtn.innerHTML="<i class='bi bi-volume-mute-fill'></i>";
    }else{
        audio.volume = volumeInput/100;
        audio.muted=false;
        muteBtn.innerHTML="<i class='bi bi-volume-up-fill'></i>";
    }
}

function audioDuration(){
    if(!isNaN(audio.duration)) {
    let durMinutes = Math.floor(audio.duration/60);
    let durSeconds = Math.round(audio.duration%60);
    musicDuration.innerHTML = durMinutes + ":" + ((durSeconds < 10)? "0" : "") + durSeconds; 
    let currentTime = audio.currentTime;
    let minutes = Math.floor(currentTime / 60);
    let seconds = Math.round(currentTime % 60);
    musicCountdown.innerHTML = minutes + ":" + ((seconds < 10)? "0" : "") + seconds;
    }  
    updateSlider(); 
}


function updateSlider(){
    let sliderTime = (audio.currentTime*100) / audio.duration;  
    musicSlider.value = sliderTime;
}

musicSlider.addEventListener("change",function(){    
    let setTime=(musicSlider.value*(audio.duration)/100);
    audio.currentTime=setTime;
});

function loopAudio(){
    if(!audio.loop) {
        audio.setAttribute("loop","loop");
        loopBtn.innerHTML="<i class='bi bi-repeat-1'></i>";
    }else{
        audio.removeAttribute('loop');
        loopBtn.innerHTML="<i class='bi bi-repeat'></i>";
   } 
}
function ShuffleAudio(){
    tracks= tracks.sort( () => Math.random() - 0.5) ;
    console.log(tracks);
}    

loadSong();

 playBtn.addEventListener( "click",playPause);
 loopBtn.addEventListener("click", loopAudio);
 shuffleBtn.addEventListener("click",ShuffleAudio);
 nextBtn.addEventListener("click",nextAudio);
 prevBtn.addEventListener("click",prevAudio);
 volumeRange.addEventListener("change",volumeUpdate);
 muteBtn.addEventListener("click",muteUnmute);