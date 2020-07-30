const synth = window.speechSynthesis;

function speak() {
  if (synth.speaking) {
    return;
  }

  const utterThis = new SpeechSynthesisUtterance('Design Systems Architect');
  synth.speak(utterThis);
}

document.querySelector('.speak').addEventListener('click', () => speak());