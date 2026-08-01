// ---- Scroll reveal for polaroids ----
const polaroids = document.querySelectorAll('.polaroid');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in-view'), i * 120);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
polaroids.forEach(p => observer.observe(p));

// ---- Music player ----
const bgm = document.getElementById('bgm');
const playBtn = document.getElementById('play-btn');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');
const progressFill = document.getElementById('progress-fill');
const reels = document.querySelectorAll('.reel');

playBtn.addEventListener('click', () => {
  if (bgm.paused) {
    bgm.play();
    iconPlay.style.display = 'none';
    iconPause.style.display = 'block';
    reels.forEach(r => r.classList.add('spin'));
  } else {
    bgm.pause();
    iconPlay.style.display = 'block';
    iconPause.style.display = 'none';
    reels.forEach(r => r.classList.remove('spin'));
  }
});

bgm.addEventListener('timeupdate', () => {
  if (bgm.duration) {
    progressFill.style.width = `${(bgm.currentTime / bgm.duration) * 100}%`;
  }
});

// ---- Hard desktop-only gate (belt-and-braces alongside CSS) ----
// Also blocks touch-primary devices with wide viewports (e.g. tablets in landscape)
function checkDevice() {
  const isNarrow = window.innerWidth < 900;
  const isTouchPrimary = window.matchMedia('(pointer: coarse)').matches;
  const site = document.getElementById('site');
  const gate = document.getElementById('mobile-gate');
  if (isNarrow || isTouchPrimary) {
    site.style.display = 'none';
    gate.style.display = 'flex';
  } else {
    gate.style.display = 'none';
    site.style.display = 'block';
  }
}
checkDevice();
window.addEventListener('resize', checkDevice);
