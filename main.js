/*Player icons buttons*/
const icons = document.querySelector(".player__icons");

const like = icons.querySelector(".far.fa-heart");
const dislike = icons.querySelector(".fas.fa-heart");



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
const songsDetails = document.querySelector(".player__music");
const songAuthor = songsDetails.querySelector(".songAuthor");
const songTitle = songsDetails.querySelector(".songTitle");

const playerScreen = document.querySelector(".player__screen");
const songCover = playerScreen.querySelector(".songCover");

const playerScreenSmall = document.querySelector("#player__screen");
const songCoverSmall = playerScreenSmall.querySelector("#songCover");

const songNameSmall = playerScreenSmall.querySelector("#song__name");
const songAuthorSmall = songNameSmall.querySelector("#songAuthor");
const songTitleSmall = songNameSmall.querySelector("#songTitle");

var songItem = document.getElementsByClassName("player__song");


startSong.addEventListener("click", playOrPause);
stopSong.addEventListener("click", playOrPause);
prevSong.addEventListener("click", prev);
nextSong.addEventListener("click", next);


like.addEventListener("click", likeIconChange);
dislike.addEventListener("click", dislikeIconChange);


function likeIconChange() {
    like.classList.toggle('invisible');
    dislike.classList.toggle('invisible');
    dislike.classList.toggle('visible');
    like.classList.toggle('visible');
}


function dislikeIconChange() {
    like.classList.toggle('invisible');
    dislike.classList.toggle('invisible');
    dislike.classList.toggle('visible');
    like.classList.toggle('visible');
}


let songs = [
    {
        author: "Chad Crouch",
        title: "Hot Pink",
        song: "songs/Chad_Crouch_-_Hot_Pink.mp3",
        cover: "covers/chad_crouch.jpg",
        background: "linear-gradient(rgb(222,39,95), rgb(239,156,134))",
        duration: "02:30"
    },
    {
        author: "Derek Clegg",
        title: "Almost Get Us There",
        song: "songs/Derek_Clegg_-_07_-_Ill_Almost_Get_Us_There.mp3",
        cover: "covers/derek_clegg.jpg",
        background: "linear-gradient(rgb(237, 212, 160), rgb(64, 85, 99))",
        duration: "02:54"
    },
    {
        author: "Scott Holmes",
        title: "Humanity",
        song: "songs/Scott_Holmes_-_03_-_-_Humanity.mp3",
        cover: "covers/scott_holmes.jpg",
        background: "linear-gradient(rgb(68,55,72), rgb(231,131,95))",
        duration: "02:43"
    },
    {
        author: "A.A. Alto",
        title: "Archipelago",
        song: "songs/A_A_Aalto_-_Archipelago.mp3",
        cover: "covers/aalto.jpg",
        background: "linear-gradient(rgb(255,255,25), rgb(246,144,158))",
        duration: "02:19"
    },
    {
        author: "Monk Turner",
        title: "It's Your Birthday",
        song: "songs/Monk_Turner__Fascinoma_-_01_-_Its_Your_Birthday.mp3",
        cover: "covers/birthsday.jpg",
        background: "linear-gradient(rgb(79,31,8), rgb(131,130,125))",
        duration: "00:36"
    },
    {
        author: "Derek Clegg",
        title: "I Have You",
        song: "songs/Derek_Clegg_-_14_-_I_Have_You.mp3",
        cover: "covers/i_have_you.jpg",
        background: "linear-gradient(rgb(153,87,75), rgb(184,184,184))",
        duration: "03:10"

    },
    {
        author: "Jahzzar",
        title: "Siesta",
        song: "songs/Jahzzar_-_05_-_Siesta.mp3",
        cover: "covers/siesta.jpg",
        background: "linear-gradient(rgb(210,184,155), rgb(112,114,103))",
        duration: "02:19"
    },
    {
        author: "Padington Bear",
        title: "Starling",
        song: "songs/Podington_Bear_-_Starling.mp3",
        cover: "covers/starling.jpeg",
        background: "linear-gradient(rgb(114,102,79), rgb(72,93,112))",
        duration: "01:45"
    },
    {
        author: "Scott Holmes",
        title: "Feeling Sunny",
        song: "songs/Scott_Holmes_-_12_-_Feeling_Sunny.mp3",
        cover: "covers/sunny.png",
        background: "linear-gradient(rgb(239,231,156), rgb(243,111,32))",
        duration: "02:03"
    },
    {
        author: "Vincent Augustus",
        title: "Woah",
        song: "songs/Vincent_Augustus_-_woah.mp3",
        cover: "covers/woah.jpg",
        background: "linear-gradient(rgb(68,55,72), rgb(65,68,190))",
        duration: "02:02"
    }

];

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
    changeBodyBg(songs[currentSong].background);

}

function changeBodyBg(color) {
    document.body.style.background = color;
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
        currentSongScreenUpdate();

        song.play();


    } else {
        currentSong++;
        songInfoUpdate();
        currentSongScreenUpdate();

        song.play();

    }
}

function prev() {

    currentSong--;
    if (currentSong < 0) {
        currentSong = 2;
    }
    songInfoUpdate();
    currentSongScreenUpdate();

    song.play();
    currentSongScreenUpdate();
}


function currentSongScreenUpdate() {
    songAuthorSmall.innerText = songs[currentSong].author;
    songTitleSmall.innerText = songs[currentSong].title;
    songCoverSmall.src = songs[currentSong].cover;
}

function displaySongs(song) {
    const playerSongs = document.querySelector(".player__songs");
    let result = '';
    songs.forEach(song => {
        result += `
           <div class="player__song">
            <div class="song__info">
                <img src=${song.cover} alt="">
                <div class="song__name">
                    <span>${song.title}</span>
                    <span>${song.author}</span>
                </div>
            </div>
            <p>${song.duration}</p>
        </div>
      `;
    });

    playerSongs.innerHTML = result;
}

displaySongs();

for (var i = 0; i < songs.length; i++) {
    songItem[i].addEventListener("click", playSong)
}


function playSong() {
// this.songItem.innerHTML = songs[currentSong].song;
    // songItem[song].play();
    // songItem[i].play();
    // songItem.play();
    // song.play();
    // songs[i].song.play();
    // songs[i].play();
    // this.songs[i].song.play();
    // this.song.play();
    // this.play();
    for (var i = 0; i < songs.length; i++) {
        var audioElement = [];
        audioElement = new Audio(songs[i].song);
        // songItem[i].song = audioElement[i];
        // audioElement[i].play();
        console.log(audioElement[i]);

    }

    console.log("hello");
}




