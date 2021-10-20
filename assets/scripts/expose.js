// expose.js
window.addEventListener('DOMContentLoaded', init);

function setHorn(event) {
  const hornImg = document.getElementsByTagName('img')[0];
  hornImg.src = `assets/images/${event.target.value}.svg`;

  const hornAudio = document.getElementsByTagName('audio')[0];
  hornAudio.src = `assets/audio/${event.target.value}.mp3`
}

function setVolume(event) {
  const volumeValue = `${event.target.value}`;
  const volumeImg = document.getElementsByTagName('img')[1];
  const hornAudio = document.getElementsByTagName('audio')[0];

  if (volumeValue == 0) {
    volumeImg.src = "assets/icons/volume-level-0.svg";
    hornAudio.volume = volumeValue;
  } else if (volumeValue < 33) {
    volumeImg.src = "assets/icons/volume-level-1.svg";
    hornAudio.volume = volumeValue / 100;
  } else if (volumeValue < 67) {
    volumeImg.src = "assets/icons/volume-level-2.svg";
    hornAudio.volume = volumeValue / 100;
  } else {
    volumeImg.src = "assets/icons/volume-level-3.svg";
    hornAudio.volume = volumeValue / 100;
  }
}

function playHorn(event, jsConfetti) {
  const hornAudio = document.getElementsByTagName('audio')[0];
  const hornSelect = document.getElementById("horn-select").value;
  if (!isNaN(hornAudio.duration)) {
    hornAudio.play();

    if (hornSelect == "party-horn") {
      jsConfetti.addConfetti();
    }
  }
}

function init() {
  const jsConfetti = new JSConfetti();

  document.getElementById("horn-select").addEventListener("change", setHorn);
  document.getElementById("volume").addEventListener("change", setVolume);
  document.getElementsByTagName("button")[0].addEventListener("click", event=> {
    playHorn(event,jsConfetti);
  });
}