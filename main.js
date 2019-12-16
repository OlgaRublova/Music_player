/*Player icons buttons*/
const icons = document.querySelector(".player__icons");
const like = icons.querySelector(".fa-heart");
const history = icons.querySelector(".fa-history");
const random = icons.querySelector(".fa-random");
const list = icons.querySelector(".fa-list-ul");

/*Player controls buttons*/
const control = document.querySelector(".player__controls");
const startSong = control.querySelector(".fa-play-circle");
const stopSong = control.querySelector(".fa-pause-circle");
const prevSong = control.querySelector(".fa-step-backward");
const nextSong = control.querySelector(".fa-step-forward");

/*Player song-controls buttons*/
const songControl = document.querySelector(".player__song-controls");
const backward = songControl.querySelector(".fa-undo-alt");
const center = songControl.querySelector(".fa-align-center");

/*progress bar*/
const bar = document.querySelector(".progress__bar");
const fillBar = bar.querySelector("span");

/*song time*/
const time = document.querySelector(".player__bar");
const currentSongTime = time.querySelector('p');
const currentSongTimeCountDown = document.getElementById("#countdown");

/*song details*/
var songsDetails = document.querySelector(".player__music");
var songAuthor = songsDetails.querySelector(".songAuthor");
var songTitle = songsDetails.querySelector(".songTitle");

var playerScreen = document.querySelector(".player__screen");
var songCover = playerScreen.querySelector(".songCover");


startSong.addEventListener("click", playOrPause);
stopSong.addEventListener("click", playOrPause);
prevSong.addEventListener("click", prev);
nextSong.addEventListener("click", next);

let songs = [
    {
        author: "Chad Crouch",
        title: "Hot Pink",
        song: "songs/Chad_Crouch_-_Hot_Pink.mp3",
        cover: "covers/chad_crouch.jpg",
    },
    {
        author: "Derek Clegg",
        title: "Almost Get Us There",
        song: "songs/Derek_Clegg_-_07_-_Ill_Almost_Get_Us_There.mp3",
        cover: "covers/derek_clegg.jpg"
    }
    ,
    {
        author: "Scott Holmes",
        title: "Humanity",
        song: "songs/Scott_Holmes_-_03_-_-_Humanity.mp3",
        cover: "covers/scott_holmes.jpg"

    }];

var currentSong = 0;
var song = new Audio(songs[currentSong].song);

window.onload = init();

function init() {
    stopSong.classList.toggle('visible');
    startSong.classList.toggle('invisible');
    fillBar.style.width = "0px";
}


function songInfoUpdate() {
    songAuthor.innerText = songs[currentSong].author;
    songTitle.innerText = songs[currentSong].title;
    songCover.src = songs[currentSong].cover;
    song.src = songs[currentSong].song;
}


function playOrPause() {
    if (song.paused) {
        song.play();

        stopSong.classList.toggle('visible');
        startSong.classList.toggle('invisible');
        barUpdate();
    } else {
        song.pause();
        startSong.classList.toggle('invisible');
        stopSong.classList.toggle('visible');
    }
}

function barUpdate() {
    song.addEventListener('timeupdate', function () {
        const position = song.currentTime / song.duration;
        fillBar.style.width = position * 100 + '%';
        roundTime();
        countDown();
    });
}

function roundTime() {
    var playTime, mins, secs, minR, secR;
    playTime = Number(parseInt(song.currentTime));
    mins = Math.floor(playTime / 60);
    secs = playTime - (mins * 60);
    minR = mins.toString();
    secR = secs.toString();
    currentSongTime.innerText = minR.padStart(2, "0") + ":" + secR.padStart(2, "0");
}

function countDown() {
    var duration, playTime, timeLeft, sec, min, s, m;

        duration = Number(parseInt(song.duration));
        playTime = Number(parseInt(song.currentTime));
        timeLeft = duration - playTime;

        s = Number(parseInt(timeLeft % 60));
        m = Number(parseInt((timeLeft / 60) % 60));

        min = m.toString();
        sec = s.toString();
        currentSongTimeCountDown.innerText = min.padStart(2, "0") + ":" + sec.padStart(2, "0");

}


function next() {
    if (currentSong === songs.length - 1) {
        currentSong = 0;
        songInfoUpdate();
        song.play();

    } else {
        currentSong++;
        songInfoUpdate();
        song.play();

    }
}

function prev() {

    currentSong--;
    if (currentSong < 0) {
        currentSong = 2;
    }
    songInfoUpdate();
    song.play();

}








