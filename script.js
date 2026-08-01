const pages = document.querySelectorAll('.page');
const dotsContainer = document.getElementById('dots');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const enterBtn = document.getElementById('enter-btn');
const bgm = document.getElementById('bgm');
const soundToggle = document.getElementById('sound-toggle');
const iconOn = document.getElementById('icon-sound-on');
const iconOff = document.getElementById('icon-sound-off');

let current = 0;
const total = pages.length;

// build dots
pages.forEach((_, i) => {
  const d = document.createElement('div');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(d);
});
const dots = document.querySelectorAll('.dot');

function goTo(index) {
  if (index < 0 || index >= total) return;
  pages[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = index;
  pages[current].classList.add('active');
  dots[current].classList.add('active');
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === total - 1;
}

prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));
prevBtn.disabled = true;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') goTo(current + 1);
  if (e.key === 'ArrowLeft') goTo(current - 1);
});

// Enter button: starts music (continuous background playback) and moves to page 1
enterBtn.addEventListener('click', () => {
  bgm.volume = 0.7;
  bgm.play().catch(() => {});
  goTo(1);
});

// Sound toggle (mute/unmute, does not stop playback position)
soundToggle.addEventListener('click', () => {
  bgm.muted = !bgm.muted;
  iconOn.style.display = bgm.muted ? 'none' : 'block';
  iconOff.style.display = bgm.muted ? 'block' : 'none';
});

// ---- Desktop-only check ----
function checkDevice() {
  const isNarrow = window.innerWidth < 900;
  const isTouchPrimary = window.matchMedia('(pointer: coarse)').matches;
  const site = document.getElementById('site');
  const popup = document.getElementById('mobile-popup');
  if (isNarrow || isTouchPrimary) {
    site.style.display = 'none';
    popup.style.display = 'flex';
  } else {
    popup.style.display = 'none';
    site.style.display = 'block';
  }
}
checkDevice();
window.addEventListener('resize', checkDevice);
