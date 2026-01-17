const songsBtn = document.querySelector(".songs_btn");
const favoritesBtn = document.querySelector(".favorites_btn");
const listSongs = document.querySelector(".list_songs");
const listFavorites = document.querySelector(".list_favorites");
const miniplayer = document.querySelector(".miniplayer");
const miniplayerInfo = document.querySelector(".miniplayer_info");
const miniplayerBtn = document.querySelector(".miniplayer_btn");
const miniplayerPlayBtn = document.querySelector(".miniplayer_play_btn");
const miniplayerPauseBtn = document.querySelector(".miniplayer_pause_btn");
const playerPlayBtn = document.querySelector(".control_play_btn");
const playerPauseBtn = document.querySelector(".control_pause_btn");
const player = document.querySelector(".player");
const playerHeaderBtn = document.querySelector(".player_header_btn");
const currentTime = document.querySelector(".player_current-time");
const totalTime = document.querySelector(".player_total-time");
const playerTitle = document.querySelector(".player_info-title");
const playerAuthor = document.querySelector(".player_info-author");
const playerCover = document.querySelector(".player_img");
const miniplayerTitle = document.querySelector(".miniplayer_info_title");
const miniplayerAuthor = document.querySelector(".miniplayer_info_author");
const miniplayerCover = document.querySelector(".miniplayer_img");
const playBtn = document.querySelector(".control");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const random = document.querySelector(".random");
const repeat = document.querySelector(".repeat");
const audio = document.querySelector(".audio");

const progress = document.getElementById("progress");
const songs = document.getElementById("songs");
const favorites = document.getElementById("favorites");

let currentTrackIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

// massive
const songInfo = [
  {
    id: 1,
    title: "Howl's moving castle",
    author: "Joe Hisashi",
    audio: "music/howl.mp3",
    cover: "covers/howl.webp",
  },
  {
    id: 2,
    title: "I really want to stay at your house",
    author: "Rosa Walton",
    audio: "music/cyberpunk.mp3",
    cover: "covers/cyberpunk.jpg",
  },
  {
    id: 3,
    title: "Duvet",
    author: "BOA",
    audio: "music/duvet.mp3",
    cover: "covers/duvet.png",
  },
  {
    id: 4,
    title: "A Cruel Angel's Thesis",
    author: "Yoko Takahashi",
    audio: "music/thesis.mp3",
    cover: "covers/thesis.webp",
  },
  {
    id: 5,
    title: "Gurenge",
    author: "LISA",
    audio: "music/gurenge.mp3",
    cover: "covers/gurenge.jpg",
  },
  {
    id: 6,
    title: "Wind",
    author: "Akeboshi",
    audio: "music/wind.mp3",
    cover: "covers/wind.jpg",
  },
  {
    id: 7,
    title: "Blue Bird",
    author: "Ikimonogakari",
    audio: "music/bird.mp3",
    cover: "covers/bird.jpg",
  },
  {
    id: 8,
    title: "The World",
    author: "Nightmare",
    audio: "music/world.mp3",
    cover: "covers/note.jpg",
  },
  {
    id: 9,
    title: "Haruka Kanata",
    author: "Asian Kung-Fu Generation",
    audio: "music/haruka.mp3",
    cover: "covers/haruka.jpg",
  },
  {
    id: 10,
    title: "Shinzou wo Sasageyo",
    author: "Linked Horizon",
    audio: "music/shinzou.mp3",
    cover: "covers/shinzou.jpg",
  },
];

// music loading
songInfo.forEach((song) => {
  const songEl = document.createElement("div");
  songEl.classList.add("list_song");
  songEl.dataset.id = song.id;
  songEl.dataset.audio = song.audio;
  songEl.innerHTML = `
    <div class="list_song-info">
      <img class="list_song-img" src="${song.cover}" alt="${song.title}">
      <div class="list_song-info_text">
        <div class="list_song-info_title">${song.title}</div>
        <div class="list_song-info_author">${song.author}</div>
      </div>
    </div>
    <button class="list_song_btn">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17 5C20.0239 5 22.5 7.47614 22.5 10.5C22.5 11.8495 21.8786 13.2457 20.8779 14.6104C19.881 15.9698 18.5412 17.2525 17.1836 18.3633C15.8284 19.472 14.4704 20.3976 13.4502 21.0469C12.9407 21.3711 12.5168 21.6258 12.2207 21.7988C12.1368 21.8479 12.0623 21.8892 12 21.9248C11.938 21.889 11.8646 21.8469 11.7812 21.7979C11.4851 21.6236 11.0604 21.3673 10.5508 21.041C9.53042 20.3878 8.17273 19.4567 6.81738 18.3447C5.45951 17.2307 4.11921 15.9463 3.12207 14.5889C2.12084 13.2258 1.5 11.8362 1.5 10.5C1.5 7.47614 3.97614 5 7 5C8.92993 5 10.6204 5.96371 11.5781 7.46875L12 8.13086L12.4219 7.46875C13.3796 5.96371 15.0701 5 17 5Z" />
      </svg>
    </button>
  `;
  songs.appendChild(songEl);
});

// header songs btn
songsBtn.addEventListener("click", () => {
  songsBtn.classList.add("active");
  favoritesBtn.classList.remove("active");
  listSongs.style.left = "0";
  listSongs.style.opacity = "1";
  listFavorites.style.left = "420px";
  listFavorites.style.opacity = "0";
});

// header favorites btn
favoritesBtn.addEventListener("click", () => {
  favoritesBtn.classList.add("active");
  songsBtn.classList.remove("active");
  listSongs.style.left = "-420px";
  listFavorites.style.left = "0";
  listSongs.style.opacity = "0";
  listFavorites.style.opacity = "1";
});

// like btn
document.addEventListener("click", (e) => {
  const likeBtn = e.target.closest(".list_song_btn");
  if (!likeBtn) return;
  const song = likeBtn.closest(".list_song");
  const songId = song.dataset.id;
  if (song.classList.contains("active")) {
    removeFromFavorites(songId);
  } else {
    addToFavorites(song);
  }
});

function addToFavorites(song) {
  song.classList.add("active");
  song.querySelector(".list_song_btn").classList.add("active");
  const clone = song.cloneNode(true);
  listFavorites.appendChild(clone);
}

function removeFromFavorites(id) {
  document.querySelectorAll(`.list_song[data-id="${id}"]`).forEach((song) => {
    song.classList.remove("active");
    song.querySelector(".list_song_btn").classList.remove("active");
    if (song.closest(".list_favorites")) song.remove();
  });
}

// miniplayer change
document.addEventListener("click", (e) => {
  const card = e.target.closest(".list_song-info");
  if (!card) return;
  const songEl = card.closest(".list_song");
  const songId = Number(songEl.dataset.id);
  currentTrackIndex = songInfo.findIndex((song) => song.id === songId);
  const song = songInfo[currentTrackIndex];
  playerTitle.textContent = song.title;
  playerAuthor.textContent = song.author;
  playerCover.src = song.cover;
  audio.src = song.audio;
  miniplayerTitle.textContent = song.title;
  miniplayerAuthor.textContent = song.author;
  miniplayerCover.src = song.cover;
  if (miniplayerPlayBtn.classList.contains("active")) {
    miniplayerPlayBtn.classList.remove("active");
    miniplayerPauseBtn.classList.add("active");
    playerPlayBtn.classList.remove("active");
    playerPauseBtn.classList.add("active");
  }
  audio.load();
  audio.play();
});

// miniplayer play/pause btn
miniplayerBtn.addEventListener("click", () => {
  if (miniplayerPlayBtn.classList.contains("active")) {
    miniplayerPlayBtn.classList.remove("active");
    miniplayerPauseBtn.classList.add("active");
    playerPlayBtn.classList.remove("active");
    playerPauseBtn.classList.add("active");
    audio.play();
  } else {
    miniplayerPlayBtn.classList.add("active");
    miniplayerPauseBtn.classList.remove("active");
    playerPlayBtn.classList.add("active");
    playerPauseBtn.classList.remove("active");
    audio.pause();
  }
});

// player play/pause btn
playBtn.addEventListener("click", () => {
  if (playerPlayBtn.classList.contains("active")) {
    playerPlayBtn.classList.remove("active");
    playerPauseBtn.classList.add("active");
    miniplayerPlayBtn.classList.remove("active");
    miniplayerPauseBtn.classList.add("active");
    audio.play();
  } else {
    playerPlayBtn.classList.add("active");
    playerPauseBtn.classList.remove("active");
    miniplayerPlayBtn.classList.add("active");
    miniplayerPauseBtn.classList.remove("active");
    audio.pause();
  }
});

// random
random.addEventListener("click", () => {
  isShuffle = !isShuffle;
  random.classList.toggle("active");
});

function playNextTrack() {
  if (isShuffle) {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * songInfo.length);
    } while (nextIndex === currentTrackIndex && songInfo.length > 1);
    currentTrackIndex = nextIndex;
  } else {
    currentTrackIndex++;
    if (currentTrackIndex >= songInfo.length) {
      currentTrackIndex = 0;
    }
  }
  loadTrack(currentTrackIndex);
}



// repeat
repeat.addEventListener("click", () => {
  repeat.classList.toggle("active");
  isRepeat = !isRepeat;
});

// player open/close
miniplayerInfo.addEventListener("click", () => {
  player.style.top = "0";
});
playerHeaderBtn.addEventListener("click", () => {
  player.style.top = "700px";
});

// time and slider
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

audio.addEventListener("loadedmetadata", () => {
  progress.max = audio.duration;
  progress.value = 0;
  currentTime.textContent = "0:00";
  totalTime.textContent = formatTime(audio.duration);
  updateSliderBackground(progress);
});

audio.addEventListener("timeupdate", () => {
  progress.value = audio.currentTime;
  currentTime.textContent = formatTime(audio.currentTime);
  updateSliderBackground(progress);
});

function updateSliderBackground(slider) {
  const percent = (slider.value / slider.max) * 100;
  slider.style.background = `linear-gradient(to right, #25a45c 3%, #25a45c ${percent}%, #5e5a5a ${percent}%, #5e5a5a 100%)`;
}

progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
  currentTime.textContent = formatTime(audio.currentTime);
  updateSliderBackground(progress);
});

// prev/next track btns
function loadTrack(index) {
  const song = songInfo[index];
  audio.src = song.audio;
  playerTitle.textContent = song.title;
  playerAuthor.textContent = song.author;
  playerCover.src = song.cover;
  miniplayerTitle.textContent = song.title;
  miniplayerAuthor.textContent = song.author;
  miniplayerCover.src = song.cover;
  audio.load();
  audio.play();
}

nextBtn.addEventListener("click", () => {
  if (miniplayerPlayBtn.classList.contains("active")) {
    miniplayerPlayBtn.classList.remove("active");
    miniplayerPauseBtn.classList.add("active");
    playerPlayBtn.classList.remove("active");
    playerPauseBtn.classList.add("active");
  }
  playNextTrack();
});

audio.addEventListener("ended", () => {
  if (isRepeat) {
    audio.currentTime = 0;
    audio.play();
  } else {
    playNextTrack();
  }
});

prevBtn.addEventListener("click", () => {
  if (miniplayerPlayBtn.classList.contains("active")) {
    miniplayerPlayBtn.classList.remove("active");
    miniplayerPauseBtn.classList.add("active");
    playerPlayBtn.classList.remove("active");
    playerPauseBtn.classList.add("active");
  }
  currentTrackIndex--;
  if (currentTrackIndex < 0) {
    currentTrackIndex = songInfo.length - 1;
  }
  loadTrack(currentTrackIndex);
});

