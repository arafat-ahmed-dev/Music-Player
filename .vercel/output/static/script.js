const musicArr = [
    {title:"Faded - Alan Walker", artist:"Alan Walker", url:"./audio/Alan Walker  Faded.mp3", imglink:"./img/faded.jpeg" ,duration:"3:32"},
    {title:"Hookah bar", artist:" Himesh Reshammiya", url:"./audio/Hookah Bar  Khiladi 786  Akshay Kumar  Asin  Himesh Reshammiya.mp3", imglink:"./img/Hookah bar.jpeg" ,duration:"2:54"},
    {title:"Tu Hai kaha", artist:"Ahad Khan, Usama Ali, and ZAYN", url:"./audio/AUR  TU HAI KAHAN  Raffey  Usama  Ahad Official Music Video.mp3", imglink:"./img/Tu hai kaha.jpeg" ,duration:"4:23"},
    {title:"Sia - Unstopable", artist:"Sia", url:"./audio/Sia  Unstoppable Official Video  Live from the Nostalgic For The Present Tour.mp3", imglink:"./img/unstopable.jpeg" ,duration:"4:46"},
    {title:"Ve Kamleya", artist:"Arijit Singh", url:"./audio/Ve Kamleya  Rocky Aur Rani Kii Prem Kahaani  Ranveer  Alia  Pritam  Amitabh  Arijit  Shreya.mp3", imglink:"./img/ve kamleya.jpeg" ,duration:"3:09"}
];
const songbox = document.querySelector(".music-list");
const songname = document.querySelector(".name");
const artistname = document.querySelector(".artist");
const duration = document.querySelector(".duration");
const playsongimg = document.querySelector(".music-img>img");
const play = document.querySelector(".play");
const backwardButton = document.querySelector(".backward");
const forwardButton = document.querySelector(".forward");
const seekbar = document.querySelector(".seek");
const currentTimeDisplay = document.querySelector(".current-time");

let clutter = ""
musicArr.forEach((elem, index)=>{
    clutter += `<div class="music-bar" id="${index}">
                <img src="${elem.imglink}" alt="music-img">
                <p class="music-name">${elem.title}</p>
            </div>`
    })
const audio = new Audio();
songbox.innerHTML = clutter;
songbox.addEventListener("click", (obj)=>{ 
    let imgextract = obj.target.id
    let filter = musicArr[imgextract].url
    let filterimgurl = musicArr[imgextract].imglink;
    let filtertitle = musicArr[imgextract].title;
    let filterartist = musicArr[imgextract].artist;
    let filterduration = musicArr[imgextract].duration;
    songname.textContent = filtertitle;
    artistname.textContent = filterartist;
    duration.textContent = filterduration;
    playsongimg.src = filterimgurl;
    audio.src = filter
    audio.play()
    play.innerHTML = `<i class="fa-solid fa-pause"></i>`
    if (audio.play) {
        playsongimg.classList.add("animation");
    } else {
        playsongimg.classList.remove("animation");
    }
});
let isFirstPlay = true;
let currentSongIndex = 0;

play.addEventListener("click",()=>{
    if(isFirstPlay){
        isFirstPlay = false;
        let firstSong = musicArr[0];
        songname.textContent = firstSong.title;
        artistname.textContent = firstSong.artist;
        duration.textContent = firstSong.duration;
        playsongimg.src = firstSong.imglink;
        audio.src = firstSong.url;
        audio.play();
        play.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        playsongimg.classList.add("animation");
    } else {
        if(audio.paused){
            audio.play()
            play.innerHTML = `<i class="fa-solid fa-pause"></i>`
            playsongimg.classList.add("animation")
        }else{
            audio.pause()
            play.innerHTML = `<i class="fa-solid fa-play"></i>`
            playsongimg.classList.remove("animation")
        }
    }
});

// Add event listeners for backward and forward buttons

backwardButton.addEventListener("click", ()=>{
    if(currentSongIndex > 0){
        currentSongIndex--;
        updateSongInfo(currentSongIndex);
    }
});

forwardButton.addEventListener("click", ()=>{
    if(currentSongIndex < musicArr.length - 1){
        currentSongIndex++;
        updateSongInfo(currentSongIndex);
    }
});



audio.addEventListener("timeupdate", updateSeekbar);
audio.addEventListener("ended", playNextSong);

function updateSeekbar() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const percentage = (currentTime / duration) * 100;
    seekbar.value = percentage;

    // Update the current time display
    const formattedCurrentTime = formatTime(currentTime);
    currentTimeDisplay.textContent = formattedCurrentTime;
}

seekbar.addEventListener("input", (e) => {
    const seekTime = (e.target.value / 100) * audio.duration;
    if (!isNaN(seekTime) && isFinite(seekTime)) {
        audio.currentTime = seekTime;
        // Update the current time display immediately
        const formattedSeekTime = formatTime(seekTime);
        currentTimeDisplay.textContent = formattedSeekTime;
    }
});

// Helper function to format time (e.g., convert seconds to "mm:ss" format)
function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % musicArr.length;
    updateSongInfo(currentSongIndex);
}
function updateSongInfo(songIndex) {
    const song = musicArr[songIndex];
    songname.textContent = song.title;
    artistname.textContent = song.artist;
    duration.textContent = song.duration;
    playsongimg.src = song.imglink;
    audio.src = song.url;
    audio.play();
    play.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    playsongimg.classList.add("animation");
}