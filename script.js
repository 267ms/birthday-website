// ============================================================
// PERSONAL DETAILS — EDIT HERE
// This is the only section most people need to touch.
// ============================================================

// The name that appears on the birthday card.
const birthdayName = "Your Friend Name";

// The short line that types itself out under the name on the card.
const cardGreeting = "I made you something small, just for today.";

// How long each photo stays on screen, in milliseconds.
// 1000 = 1 second. Raise this if you want a slower, calmer slideshow.
const PHOTO_DURATION = 250;

// How long the fade/slide between photos takes, in milliseconds.
// Keep this shorter than PHOTO_DURATION.
const TRANSITION_DURATION = 400;

// The final birthday letter. Shown one line at a time with a
// typewriter effect after the last photo. Edit freely — line
// breaks in the text below become new lines on screen.
const birthdayMessage =
`Some people make ordinary moments feel special
just by being in them.

You're one of those people.

Here's to another year of your laugh,
your ideas, and all the small chaos you bring.

Happy Birthday. I hope today feels exactly like you deserve.`;

// ============================================================
// ADD YOUR PHOTOS HERE
// Put files in the images/ folder and list them in order below.
// Supports .jpg, .jpeg, .png, .webp.
// ============================================================

const photos = [
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg",
    "images/photo5.jpg",
    "images/photo6.jpg",
    "images/photo7.jpg",
    "images/photo8.jpg",
    "images/photo9.jpg",
    "images/photo10.jpg",
    "images/photo11.jpg",
    "images/photo12.jpg",
    "images/photo13.jpg",
    "images/photo14.jpg",
    "images/photo15.jpg",
    "images/photo16.jpg",
    "images/photo17.jpg",
    "images/photo18.jpg",
    "images/photo19.jpg",
    "images/photo20.jpg"
];
// ============================================================
// EVERYTHING BELOW THIS LINE RUNS THE EXPERIENCE.
// You don't need to edit it to personalize the site — only
// touch it if you want to change how things behave.
// ============================================================

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const screens = {
  loading: document.getElementById("loading"),
  card: document.getElementById("card-screen"),
  slideshow: document.getElementById("slideshow-screen"),
  final: document.getElementById("final-screen"),
  ending: document.getElementById("ending-screen"),
};

/**
 * Swaps one full-screen section for another with a soft
 * fade + blur transition, rather than an abrupt cut.
 */
function showScreen(from, to) {
  return new Promise((resolve) => {
    const finish = () => {
      if (from) {
        from.hidden = true;
        from.classList.remove("screen--leaving");
      }
      to.hidden = false;
      to.classList.add("screen--entering");
      setTimeout(() => {
        to.classList.remove("screen--entering");
        resolve();
      }, prefersReducedMotion ? 0 : 800);
    };

    if (from) {
      from.classList.add("screen--leaving");
      setTimeout(finish, prefersReducedMotion ? 0 : 400);
    } else {
      finish();
    }
  });
}

// ------------------------------------------------------------
// 1. LOADING SCREEN → BIRTHDAY CARD
// ------------------------------------------------------------
document.getElementById("birthdayName").textContent = birthdayName;

async function typewrite(el, text, speed = 55) {
  el.textContent = "";
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  el.appendChild(cursor);
  for (const ch of text) {
    cursor.insertAdjacentText("beforebegin", ch);
    if (!prefersReducedMotion) {
      await new Promise((r) => setTimeout(r, speed));
    }
  }
  cursor.remove();
}

function initLoading() {
  const LOADING_DELAY = prefersReducedMotion ? 400 : 800;
  setTimeout(async () => {
    await showScreen(screens.loading, screens.card);
    typewrite(document.getElementById("typewriterGreeting"), cardGreeting);
  }, LOADING_DELAY);
}

// ------------------------------------------------------------
// 2. BIRTHDAY CARD → SLIDESHOW
// ------------------------------------------------------------
document.getElementById("openSurpriseBtn").addEventListener("click", async () => {
  startMusic();
  await showScreen(screens.card, screens.slideshow);
  runSlideshow();
});

// ------------------------------------------------------------
// 3. PHOTO SLIDESHOW
// ------------------------------------------------------------

// A pool of entrance animations. One is picked for each photo so
// consecutive photos rarely repeat the same movement.
const ENTRANCE_ANIMATIONS = [
  "anim-slideLeft",
  "anim-slideRight",
  "anim-slideTop",
  "anim-slideBottom",
  "anim-diagonalIn",
  "anim-rotateFade",
  "anim-scaleUp",
  "anim-scaleDown",
  "anim-blurIn",
];

function pickAnimation(lastAnim) {
  let choice = lastAnim;
  while (choice === lastAnim) {
    choice = ENTRANCE_ANIMATIONS[
      Math.floor(Math.random() * ENTRANCE_ANIMATIONS.length)
    ];
  }
  return choice;
}

const photoStage = document.getElementById("photoStage");
const progressCount = document.getElementById("progressCount");
const progressFill = document.getElementById("progressFill");

async function runSlideshow() {
  const total = photos.length;
  let lastAnim = null;

  for (let i = 0; i < total; i++) {
    const src = photos[i];

    // Wrapper handles the one-time entrance animation.
    const frame = document.createElement("div");
    const entranceClass = pickAnimation(lastAnim);
    lastAnim = entranceClass;
    frame.className = prefersReducedMotion ? "photo-frame" : `photo-frame anim-in ${entranceClass}`;

    // Image handles the continuous Ken Burns zoom, alternating
    // in vs. out so consecutive photos don't feel identical.
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Memory photo ${i + 1} of ${total}`;
    if (!prefersReducedMotion) {
      const kbClass = i % 2 === 0 ? "kb-in" : "kb-out";
      img.className = kbClass;
      img.style.animationDuration = `${PHOTO_DURATION + TRANSITION_DURATION}ms`;
    }
    frame.appendChild(img);

    // Clear the previous photo (if any) with a quick fade, then mount the new one.
    const prevFrame = photoStage.querySelector(".photo-frame");
    if (prevFrame) {
      prevFrame.classList.add("photo-leaving");
      setTimeout(() => prevFrame.remove(), TRANSITION_DURATION);
    }
    photoStage.appendChild(frame);

    progressCount.textContent = `${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
    progressFill.style.width = `${((i + 1) / total) * 100}%`;

    await new Promise((r) => setTimeout(r, PHOTO_DURATION));
  }

  // Emotional pause: let the last photo settle before moving on.
  await new Promise((r) => setTimeout(r, 400));
  await transitionToFinal();
}

// ------------------------------------------------------------
// 4. SLIDESHOW → FINAL MESSAGE
// ------------------------------------------------------------
async function transitionToFinal() {
  const lastFrame = photoStage.querySelector(".photo-frame");
  if (lastFrame) {
    lastFrame.classList.add("photo-leaving");
  }
  await showScreen(screens.slideshow, screens.final);
  await typewrite(document.getElementById("finalMessage"), birthdayMessage, 30);
  setTimeout(transitionToEnding, 1000);
}

// ------------------------------------------------------------
// 5. FINAL MESSAGE → CONFETTI ENDING
// ------------------------------------------------------------
async function transitionToEnding() {
  await showScreen(screens.final, screens.ending);
  launchConfetti();
  launchFloatingSymbols();
}

// ------------------------------------------------------------
// MUSIC
// ------------------------------------------------------------
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
let musicStarted = false;

function startMusic() {
  musicToggle.hidden = false;
  if (musicStarted) return;
  musicStarted = true;
  bgMusic.volume = 0;
  bgMusic
    .play()
    .then(() => fadeMusicIn())
    .catch(() => {
      // Autoplay blocked — the visible music button still lets
      // the user start it manually.
      musicToggle.setAttribute("aria-pressed", "false");
    });
}

function fadeMusicIn() {
  musicToggle.setAttribute("aria-pressed", "true");
  musicToggle.setAttribute("aria-label", "Pause birthday music");
  const target = 0.55;
  const step = 0.02;
  const fade = setInterval(() => {
    bgMusic.volume = Math.min(target, bgMusic.volume + step);
    if (bgMusic.volume >= target) clearInterval(fade);
  }, 80);
}

musicToggle.addEventListener("click", () => {
  if (bgMusic.paused) {
    startMusic();
  } else {
    bgMusic.pause();
    musicToggle.setAttribute("aria-pressed", "false");
    musicToggle.setAttribute("aria-label", "Play birthday music");
  }
});

// ------------------------------------------------------------
// BACKGROUND PARTICLES (subtle floating sparkles)
// ------------------------------------------------------------
function initParticles() {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const COUNT = prefersReducedMotion ? 0 : 26;
  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.4,
      speed: Math.random() * 0.25 + 0.05,
      drift: Math.random() * 0.4 - 0.2,
      alpha: Math.random() * 0.5 + 0.15,
    });
  }

  function tick() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#f3d9ce";
    for (const p of particles) {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.y -= p.speed;
      p.x += p.drift * 0.2;
      if (p.y < -5) {
        p.y = height + 5;
        p.x = Math.random() * width;
      }
    }
    requestAnimationFrame(tick);
  }
  if (!prefersReducedMotion) tick();
}

// ------------------------------------------------------------
// CONFETTI (final screen only)
// ------------------------------------------------------------
function launchConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const colors = ["#e3a75c", "#f0c98d", "#d99a95", "#f6ece2"];
  const COUNT = prefersReducedMotion ? 0 : 90;
  const pieces = Array.from({ length: COUNT }, () => ({
    x: Math.random() * width,
    y: -20 - Math.random() * height * 0.5,
    w: Math.random() * 8 + 4,
    h: Math.random() * 12 + 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: Math.random() * 2 + 1.5,
    drift: Math.random() * 1.4 - 0.7,
    rotation: Math.random() * 360,
    spin: Math.random() * 4 - 2,
  }));

  let frame = 0;
  const MAX_FRAMES = 60 * 6; // roughly 6 seconds

  function tick() {
    frame++;
    ctx.clearRect(0, 0, width, height);
    for (const p of pieces) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.9;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
      p.y += p.speed;
      p.x += p.drift;
      p.rotation += p.spin;
      if (p.y > height + 20) p.y = -20;
    }
    if (frame < MAX_FRAMES) {
      requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, width, height);
    }
  }
  if (!prefersReducedMotion) tick();
}

function launchFloatingSymbols() {
  if (prefersReducedMotion) return;
  const container = document.getElementById("floatingSymbols");
  const symbols = ["\u2764", "\u2728", "\u2764"];
  const COUNT = 14;

  for (let i = 0; i < COUNT; i++) {
    setTimeout(() => {
      const el = document.createElement("span");
      el.className = "floating-symbol";
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.style.left = `${Math.random() * 100}%`;
      el.style.animationDuration = `${6 + Math.random() * 4}s`;
      container.appendChild(el);
      setTimeout(() => el.remove(), 11000);
    }, i * 350);
  }
}

// ------------------------------------------------------------
// INIT
// ------------------------------------------------------------
initParticles();
initLoading();
