const mainCard = document.querySelector("#ContentWarpper");
const songImg = document.querySelector("#SongImg");
const controlButtons = document.querySelector(".control");
const currentYear = new Date().getFullYear();

const playPauseButton = document.querySelector("#PausePlay");
const audio = document.querySelector("audio");
const artist = document.querySelector("#Artist");
const songName = document.querySelector("#SongName");
const previousButton = document.querySelector("#Previous");
const nextButton = document.querySelector("#Next");
const songImgAtTheTop = document.querySelector("img");

let startDuration = document.querySelector("#Start");
const endDuration = document.querySelector("#End");
const meter = document.querySelector("#ProgrssMeterChild");
const progressBar = document.querySelector("#ProgressMeterContainer");

let isPlaying = false;
let index = 0;

const songDataBase = [
  {
    songSrc: "./music/music_1.mp3",
    title: "Baby Shark",
    artist: "Cocomelon",
    imgSrc: "./img/cocomelon.jpeg",
  },
  {
    songSrc: "./music/music_2.mp3",
    title: "With You",
    artist: "AP Dhillon",
    imgSrc: "./img/WithYou.jpeg",
  },
  {
    songSrc: "./music/music_3.mp3",
    title: "Cheques",
    artist: "Shubh",
    imgSrc: "./img/Cheques.jpeg",
  },
  {
    songSrc: "./music/music_5.mp3",
    title: "Tunak Tunak",
    artist: "Daler Mehndi",
    imgSrc: "./img/TunakTunak.jpeg",
  },
];

const loadMusic = () => {
  audio.src = songDataBase[index].songSrc;
  artist.textContent = songDataBase[index].artist;
  songName.textContent = songDataBase[index].title;
  songImgAtTheTop.src = songDataBase[index].imgSrc;
};

audio.addEventListener("ended", () => {
  if (index < songDataBase.length - 1) {
    index++;
  } else {
    index = 0;
  }
  loadMusic();
  play();
});

loadMusic();

nextButton.addEventListener("click", () => {
  if (index < songDataBase.length - 1) {
    index++;
  } else {
    index = 0;
  }
  loadMusic();
  play();
});

previousButton.addEventListener("click", () => {
  if (index > 0) {
    index--;
  } else {
    index = songDataBase.length - 1;
  }
  loadMusic();
  play();
});

const play = () => {
  isPlaying = true;
  const playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise.then(_ => {
      playPauseButton.classList.replace("fa-play", "fa-pause");
      songImg.classList.add("anime");
    }).catch(error => {
      console.error("Autoplay failed:", error.message);
    });
  }
};

const pause = () => {
  isPlaying = false;
  audio.pause();
  playPauseButton.classList.replace("fa-pause", "fa-play");
  songImg.classList.remove("anime");
};

playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
});

const timeStamp = (event) => {
  let { duration, currentTime } = event.srcElement;
  const full_second = Math.floor(duration % 60);
  const full_minute = Math.floor(duration / 60);
  const start_second = Math.floor(currentTime % 60);
  const start_minute = Math.floor(currentTime / 60);
  const totalDuration = `${full_minute} : ${full_second}`;
  const currenDuration = `${start_minute} : ${start_second}`;
  if (duration) {
    endDuration.textContent = totalDuration;
  }
  startDuration.textContent = currenDuration;
  const percentage = (currentTime / duration) * 100;
  meter.style.width = `${percentage}%`;
};

audio.addEventListener("timeupdate", timeStamp);

progressBar.addEventListener("click", (event) => {
  const { duration } = audio;
  const moreProgress =
    (event.offsetX / event.srcElement.clientWidth) * duration;
  audio.currentTime = moreProgress;
});

document.querySelector("#Year").innerHTML = currentYear;

mainCard.addEventListener("mouseover", (event) => {
  const xAxis = (window.innerWidth / 2 - event.pageX) / 15;
  const yAxis = (window.innerHeight / 2 - event.pageY) / 15;
  mainCard.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
  songImg.style.transform = `rotate(${xAxis}deg)`;
  controlButtons.style.transform = `rotate(${xAxis}deg)`;
});

mainCard.addEventListener("mouseleave", () => {
  mainCard.style.transform = "rotateX(0deg) rotateY(0deg)";
  songImg.style.transform = "rotate(0deg)";
  controlButtons.style.transform = "rotate(0deg)";
});