// explore.js

var synth = window.speechSynthesis;
window.addEventListener('DOMContentLoaded', init);

function init() {
  var voices;
  var voiceSelect = document.getElementById("voice-select");
  var inputText = document.getElementById("text-to-speak");
  var talkButton = document.getElementsByTagName("button")[0];
  var smileyImage = document.getElementsByTagName("img")[0];

  function populateVoiceList() {
    setTimeout(() => {
      voices = synth.getVoices();

      for (var i = 0; i < voices.length; i++) {
        var option = document.createElement('option');
        option.textContent = voices[i].name + '(' + voices[i].lang + ')';

        if (voices[i].default) {
          option.textContent += ' -- DEFAULT';
          voiceSelect.value = option;
        }

        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.appendChild(option);
      }
    }, 50);
  }

  populateVoiceList();
  talkButton.addEventListener("click", event=> {
    var utterThis = new SpeechSynthesisUtterance(inputText.value);
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    synth.speak(utterThis);

    utterThis.onstart = function(event) {
      smileyImage.src = "assets/images/smiling-open.png";
    }
    utterThis.onend = function(event) {
      smileyImage.src="assets/images/smiling.png";
    }
  })
}