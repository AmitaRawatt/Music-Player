console.log("Welcome to Spotify");


let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Mortals ", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Invincible", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "My Heart ", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Tere Bina", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba ", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan ", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam ", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana ", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
       
        // audioElement.play();
     
        // masterPlay.classList.remove('fa-play-circle');
        // masterPlay.classList.add('fa-pause-circle');
        // gif.style.opacity = 1;
        songItemPlayFn(songIndex);

    }
    else{
        // audioElement.pause();
        //   Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        //     element.classList.remove('fa-pause-circle');
        //     element.classList.add('fa-play-circle');
        // })
        
        // masterPlay.classList.remove('fa-pause-circle');
        // masterPlay.classList.add('fa-play-circle');
        // gif.style.opacity = 0;
        songItemPauseFn(songIndex);
    }
})


//codeeeeee
function songItemPlayFn(songIndex){
    // makeAllPlays();
    let songItemPlay = document.getElementById(songIndex);
    songItemPlay.classList.remove('fa-play-circle');
    songItemPlay.classList.add('fa-pause-circle');
    if((!(audioElement.paused)) || (myProgressBar.value>=100)){
        audioElement.src = `songs/${songIndex+1}.mp3`;
    }
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}

function songItemPauseFn(songIndex){
    makeAllPlays();
    let songItemPause = document.getElementById(songIndex);
    songItemPause.classList.remove('fa-pause-circle');
    songItemPause.classList.add('fa-play-circle');
    gif.style.opacity = 0;
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
}








// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }

    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.id.classList.remove('fa-pause-circle');
        element.id.classList.add('fa-play-circle');
    })
    
    songItemPlayFn(songIndex);   
    

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
  
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    songItemPlayFn(songIndex);
})