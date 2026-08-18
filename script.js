const songs = [
    {
        title: "Happy Birthday",
        artist: "Mimi Music",
        file: "audio/the_mountain-happy-birthday-508020.mp3"
    },
    {
        title: "Happy Upbeat",
        artist: "DeloSound",
        file: "audio/delosound-happy-upbeat-456257.mp3"
    },
    {
        title: "Happy Beats",
        artist: "DeloSound",
        file: "audio/delosound-happy-upbeat-453286 - Copy.mp3"
    }
];

let currentSong = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const playButton = document.getElementById("playButton");
const songTitle = document.getElementById("songTitle");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");

function loadSong(index) {
    currentSong = index;

    songTitle.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    audio.src = songs[index].file;

    playButton.textContent = "▶";
    isPlaying = false;

    progress.style.width = "0%";
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";

    document.querySelectorAll(".song").forEach((song, i) => {
        song.classList.toggle("active", i === index);
    });
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playButton.textContent = "▶";
        isPlaying = false;
    } else {
        audio.play().catch(() => {
            alert("Add an audio file to the project to play music.");
        });

        playButton.textContent = "⏸";
        isPlaying = true;
    }
}

function previousSong() {
    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
}

function nextSong() {
    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
}

function selectSong(index) {
    loadSong(index);
}

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

audio.addEventListener("timeupdate", () => {

    if (audio.duration) {

        const percentage =
            (audio.currentTime / audio.duration) * 100;

        progress.style.width = percentage + "%";

        currentTime.textContent =
            formatTime(audio.currentTime);

        duration.textContent =
            formatTime(audio.duration);
    }
});

audio.addEventListener("ended", () => {
    nextSong();
});

function formatTime(time) {

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${seconds}`;
}

loadSong(0);