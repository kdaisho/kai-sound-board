"use strict";

init()

function init() {
  setCopyrightYear()
}

function playSound(event) {
    const dataKey =
        event.type === "keydown" ? event.keyCode : event.target.dataset.key;
    const audio = document.querySelector(`audio[data-key="${dataKey}"]`);
    const key = document.querySelector(`.key[data-key="${dataKey}"]`);
    const picture = document.querySelector(`.picture[data-key="${dataKey}"]`);
    hideAllPicture();
    stopSound(event);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    picture.classList.add("active");
    key.classList.add("playing");
}

function stopSound(event) {
    if (event.type === "click" || event.keyCode === 32) {
        event.preventDefault();
        audios.forEach(audio => audio.pause());
    }
}

function hideAllPicture() {
    const picture = document.querySelectorAll(".picture");
    for (let i = 0; i < picture.length; i++) {
        picture[i].classList.remove("active");
    }
}

function removeTransition(event) {
    if (event.propertyName !== "transform") return;
    this.classList.remove("playing");
}

function setCopyrightYear() {
  const d = new Date()
  const year = d.getFullYear()
  document.getElementById("copyright-year").innerText = year
}

const keys = document.querySelectorAll(".key");
keys.forEach(key => key.addEventListener("transitionend", removeTransition));

const audios = document.querySelectorAll("audio");
audios.forEach(audio => (audio.volume = 0.25));

window.addEventListener("keydown", playSound);

for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener("click", playSound);
}

document.getElementById("stop").addEventListener("click", stopSound);
