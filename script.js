console.log("Welcome to Spotify");

//initialize the variables
let songIndex=0;
let audioElement=new Audio('song/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar'); 
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songitem=Array.from(document.getElementsByClassName('songitem'));
let songs=[
    {songName:"Our Song", filePath:"song/1.mp3", coverPath:"covers/1.jpeg"},
    {songName:"Love Story", filePath:"song/2.mp3", coverPath:"covers/2.jpg"},
    {songName:"Dear John", filePath:"song/3.mp3", coverPath:"covers/3.jpeg"},
    {songName:"Red", filePath:"song/4.mp3", coverPath:"covers/4.jpg"},
    {songName:"Wildest Dreams", filePath:"song/5.mp3", coverPath:"covers/5.jpg"},
    {songName:"I did something bad", filePath:"song/6.mp3", coverPath:"covers/6.jpg"},
    {songName:"This is me trying", filePath:"song/7.mp3", coverPath:"covers/7.jpg"},
    {songName:"Tolerate it", filePath:"song/8.mp3", coverPath:"covers/8.jpg"}
]

songitem.forEach((element,i) => {
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
});
//audioElement.play();
// Handle play/pause, click
masterPlay.addEventListener('click', ()=>{
    if (audioElement.paused||audioElement.currentTime<=0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        
       makeAllPlays();
       songIndex= parseInt(e.target.id);
       e.target.classList.remove('fa-circle-play');
       e.target.classList.add('fa-circle-pause');
       audioElement.src=`song/${songIndex+1}.mp3`;
       masterSongName.innerText=songs[songIndex].songName;
       audioElement.currentTime=0;
       audioElement.play();
       gif.style.opacity=1;
       masterPlay.classList.remove('fa-circle-play');
       masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=7){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`song/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`song/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})