var fft;
var title;
let songs = [];
let currentSong = null;
let isPaused = false;
let lastWaveform = [];
var scene = document.getElementById('scene');
ScrollReveal().reveal('.Layer');
ScrollReveal().reveal('.headline');

function preload() {
  let songFiles = [
    'BODY FLOATED TOWARDS ME (full Suno Mix).mp3',
    'SUBTERFUGE (full Suno mix).mp3',
    'OTHERSIDE (full Suno mix).mp3',
    'OVERTHROW (full Suno mix).mp3',
    'BUTCHERY.mp3'
  ];

  for (let i = 0; i < songFiles.length; i++) {
    songs.push(loadSound(songFiles[i]));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fft = new p5.FFT();
}

function draw() {
  background(0);
  stroke(255);
  noFill();

  if (currentSong && currentSong.isPlaying() && !isPaused) {
    lastWaveform = fft.waveform();
  }

  beginShape();
  for (var i = 0; i < width; i++) {
    var index = floor(map(i, 0, width, 0, lastWaveform.length));

    var x = i;
    var y = lastWaveform[index] * 300 + height / 2;
    vertex(x, y);
  }
  endShape();
}

function mouseClicked() {
  if (isPaused) {
    if (currentSong) {
      currentSong.play();
      loop();
    }
    isPaused = false;
    return;
  }

  if (currentSong) {
    currentSong.stop();
  }

  currentSong = getRandomDanceTrack();
  currentSong.play();
}

function getRandomDanceTrack() {
  let randomIndex = Math.floor(Math.random() * songs.length);
  return songs[randomIndex];
}

function keyPressed() {
  if (keyCode === BACKSPACE) {
    if (currentSong) {
      if (isPaused) {
        currentSong.play();
        loop();
      } else {
        currentSong.pause();
        noLoop();
      }
      isPaused = !isPaused;
    }
  }
}