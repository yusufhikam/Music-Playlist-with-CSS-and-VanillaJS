let currentMusic = 0;
let isShuffle = false;

const music = document.querySelector('#audio');

const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');
const shuffleBtn = document.querySelector('.shuffle i');

const lirikBtn = document.querySelector('.lyric-btn');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const overlayModal = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn-close');

playBtn.addEventListener('click', () => {

    if(playBtn.classList.contains('pause')){
        music.play();
    }else{
        music.pause();
    }

    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
});

// formtting time in min and seconds format
const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10){
        min = `0${min}`;
    }

    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0${sec}`;
    }

    return `${min} : ${sec}`;
}

// setup music

const setMusic = (i) =>{
    seekBar.value = 0; //untuk set value range jadi 0
    let song = songs[i];

    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url(${song.cover})`;
    // set up lirik
    if(song.lyric){
        modalContent.innerHTML = song.lyric.replace(/\n/g, '<br>');
    } else {
        modalContent.innerHTML = 'No lyric available';
    }
    currentTime.innerHTML = '00.00';
    
    
    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${song.albumArt})`;
    

    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300);

    // set up lirik

}

setMusic(0);

// show modal lirik

lirikBtn.addEventListener('click', () => {
    modal.classList.add('show');
    overlayModal.classList.add('show');
});

// close modal lirik

btnCloseModal.addEventListener('click', () => {
    modal.classList.remove('show');
    overlayModal.classList.remove('show');
    // setTimeout(() => {
    //     modal.style.display = 'none';
    // }, 300);
    
});

modal.addEventListener('scroll', () => {
    if(modal.scrollTop > 10){
        btnCloseModal.style.color = "yellow";
    }else{
        btnCloseModal.style.color = "white";
    }
});

// seek bar

setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);

}, 500);

seekBar.addEventListener('change', ()=>{
    music.currentTime = seekBar.value;

});

const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.add('play');
    
}

// random lagu (shuffle)
const acakLagu = () => {
    let random = Math.floor(Math.random() * songs.length);

    // jika lagu yang diacak sama dengan yang sedang diputar, acak lagi
    while(random == currentMusic){
        random = Math.floor(Math.random() * songs.length);
    }

    currentMusic = random;
    setMusic(currentMusic); // set lagu baru setelah diacak
    playMusic(); // putar lagu yang baru diacak
}

// forward & backward music
forwardBtn.addEventListener('click', () => {
    if(isShuffle){
        acakLagu();
    } else {  
        if(currentMusic >= songs.length - 1){
            currentMusic = 0;
        } else{
            currentMusic++;
        }
        setMusic(currentMusic);
        playMusic();
    }
});


backwardBtn.addEventListener('click', () => {
    if(isShuffle){
        acakLagu();
    } else{
        if(currentMusic <= 0){
            currentMusic = songs.length - 1;
        } else{
            currentMusic--;
        }
        setMusic(currentMusic);
        playMusic();
    }
});


// auto play lagu selanjutnya
music.addEventListener('ended', () => {
    if(isShuffle){
        acakLagu();
    } else {
        if(currentMusic >= songs.length - 1){
            currentMusic = 0;
        } else{
            currentMusic++;
        }
        setMusic(currentMusic);
        playMusic();
    }
});



shuffleBtn.addEventListener('click', () => {
    if(shuffleBtn.classList.contains('fa-repeat')){
        shuffleBtn.classList.remove('fa-repeat');
        shuffleBtn.classList.add('fa-shuffle');
        shuffleBtn.style.color = '#ff5bc0';

        isShuffle = true;
    } else{
        shuffleBtn.classList.remove('fa-shuffle');
        shuffleBtn.classList.add('fa-repeat');
        shuffleBtn.style.color = 'white';

        isShuffle = false;
    }
});


