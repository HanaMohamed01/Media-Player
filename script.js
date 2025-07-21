const audio = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const volumeBtn = document.getElementById("volumeBtn");
const progressBar = document.getElementById("progressBar");
const progressContainer = document.getElementById("progressContainer");
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");
playPauseBtn.onclick = function () {
  if (audio.paused) {
    audio.play();
    playPauseBtn.innerHTML = "⏸";
  } else {
    audio.pause();
    playPauseBtn.innerHTML = "▶";
  }
};
audio.onplay = function () {
  playPauseBtn.innerHTML = "⏸";
};
audio.onpause = function () {
  playPauseBtn.innerHTML = "▶";
};
prevBtn.onclick = function () {
  audio.currentTime = 0;
};
nextBtn.onclick = function () {
  audio.currentTime = audio.duration;
};
volumeBtn.onclick = function () {
  audio.muted = !audio.muted;
  volumeBtn.innerHTML = audio.muted ? "🔇" : "🔉";
};
audio.ontimeupdate = function () {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = percent + "%";
  currentTimeEl.textContent = formatTime(audio.currentTime);
  totalTimeEl.textContent = formatTime(audio.duration);
};
audio.onloadedmetadata = function () {
  totalTimeEl.textContent = formatTime(audio.duration);
};
progressContainer.onclick = function (e) {
  const rect = progressContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const percent = x / rect.width;
  audio.currentTime = percent * audio.duration;
};
function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return m + ":" + (s < 10 ? "0" : "") + s;
}
