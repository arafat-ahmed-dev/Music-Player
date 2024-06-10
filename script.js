const musicArr = [
    {title:"Faded - Alan Walker", artist:"artist1", url:"./audio/Alan Walker  Faded.mp3", imglink:"./img/faded.jpeg" ,duration:"3:45"},
    {title:"Hookah bar", artist:"artist1", url:"./audio/Hookah Bar  Khiladi 786  Akshay Kumar  Asin  Himesh Reshammiya.mp3", imglink:"./img/Hookah bar.jpeg" ,duration:"3:45"},
    {title:"Tu Hai kaha", artist:"artist1", url:"./audio/AUR  TU HAI KAHAN  Raffey  Usama  Ahad Official Music Video.mp3", imglink:"./img/Tu hai kaha.jpeg" ,duration:"3:45"},
    {title:"Sia - Unstopable", artist:"artist1", url:"./audio/Sia  Unstoppable Official Video  Live from the Nostalgic For The Present Tour.mp3", imglink:"./img/unstopable.jpeg" ,duration:"3:45"},
    {title:"Ve Kamleya", artist:"artist1", url:"./audio/Ve Kamleya  Rocky Aur Rani Kii Prem Kahaani  Ranveer  Alia  Pritam  Amitabh  Arijit  Shreya.mp3", imglink:"./img/ve kamleya.jpeg" ,duration:"3:45"}
];
const songbox = document.querySelector(".music-list");
const songname = document.querySelector(".name");
const artistname = document.querySelector(".artist");
const playsongimg = document.querySelector(".music-img>img");
const play = document.querySelector(".play");

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
    playsongimg.src = filterimgurl;
    audio.src = filter
    console.log(filter);
    audio.play()
    play.innerHTML = `<i class="fa-solid fa-pause"></i>`
    if (audio.play) {
        playsongimg.classList.add("animation");
    } else {
        playsongimg.classList.remove("animation");
    }
});
play.addEventListener("click",()=>{
    if(audio.paused){
        audio.play()
        play.innerHTML = `<i class="fa-solid fa-pause"></i>`
        playsongimg.classList.add("animation")
    }else{
        audio.pause()
        play.innerHTML = `<i class="fa-solid fa-play"></i>`
        playsongimg.classList.remove("animation")
    }
})
// play.addEventListener("click", () => {
//     const isPaused = audio.paused;
//     audio[isPaused ? "play" : "pause"]();
//     play.innerHTML = isPaused ? `<i class="fa-solid fa-pause"></i>` : `<i class="fa-solid fa-play"></i>`;
//     playsongimg.classList.toggle("animation", isPaused);
// });