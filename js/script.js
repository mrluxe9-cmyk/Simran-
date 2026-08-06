(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------
     LOADING SCREEN + TYPING EFFECT ON "Loading Love..."
  --------------------------------------------------------- */
  const loadingScreen = document.getElementById("loadingScreen");
  const loadingText = document.getElementById("loadingText");
  const loadingBarFill = document.getElementById("loadingBarFill");
  const loadingPhrase = "Loading Love... ❤️";

  function typeText(el, text, speed, cb) {
    let i = 0;
    el.textContent = "";
    const interval = setInterval(() => {
      el.textContent += text.charAt(i);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        if (cb) cb();
      }
    }, speed);
  }

  window.addEventListener("load", () => {
    typeText(loadingText, loadingPhrase, 65);
    requestAnimationFrame(() => { loadingBarFill.style.width = "100%"; });

    setTimeout(() => {
      loadingScreen.classList.add("hidden");
      document.body.style.overflow = "auto";
      startHeroTyping();
    }, 2100);
  });

  /* ---------------------------------------------------------
     HERO TITLE TYPING EFFECT
  --------------------------------------------------------- */
  const heroTitleEl = document.getElementById("typingTitle");
  const heroTitleText = "Just For Simran ❤️";

  function startHeroTyping() {
    const cursorSpan = document.createElement("span");
    cursorSpan.className = "cursor-blink";
    cursorSpan.textContent = "|";
    let i = 0;
    heroTitleEl.textContent = "";
    heroTitleEl.appendChild(cursorSpan);

    const interval = setInterval(() => {
      cursorSpan.before(heroTitleText.charAt(i));
      i++;
      if (i >= heroTitleText.length) {
        clearInterval(interval);
      }
    }, 90);
  }

  /* ---------------------------------------------------------
     SCROLL PROGRESS -> HEARTBEAT THREAD PULSE POSITION
  --------------------------------------------------------- */
  const heartbeatPulse = document.getElementById("heartbeatPulse");

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    const trackHeight = window.innerHeight;
    heartbeatPulse.style.top = `${progress * trackHeight}px`;
  }
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  updateScrollProgress();

  /* ---------------------------------------------------------
     FADE-IN ON SCROLL (IntersectionObserver)
  --------------------------------------------------------- */
  const fadeEls = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.18 }
  );
  fadeEls.forEach((el) => observer.observe(el));

  /* ---------------------------------------------------------
     CURSOR GLOW
  --------------------------------------------------------- */
  const cursorGlow = document.getElementById("cursorGlow");
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    window.addEventListener("mousemove", (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  /* ---------------------------------------------------------
     FLOATING HEARTS + FALLING PETALS
  --------------------------------------------------------- */
  const floatingHeartsLayer = document.getElementById("floatingHearts");
  const fallingPetalsLayer = document.getElementById("fallingPetals");

  function spawnHeart() {
    const heart = document.createElement("div");
    heart.className = "f-heart";
    heart.textContent = "❤";
    const size = 0.7 + Math.random() * 1.3;
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.fontSize = `${size}rem`;
    heart.style.setProperty("--drift", `${(Math.random() * 80 - 40)}px`);
    const duration = 9 + Math.random() * 8;
    heart.style.animationDuration = `${duration}s`;
    floatingHeartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
  }

  function spawnPetal() {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}vw`;
    const size = 8 + Math.random() * 10;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.setProperty("--drift", `${(Math.random() * 100 - 50)}px`);
    const duration = 8 + Math.random() * 7;
    petal.style.animationDuration = `${duration}s`;
    fallingPetalsLayer.appendChild(petal);
    setTimeout(() => petal.remove(), duration * 1000);
  }

  let ambientIntervalHeart, ambientIntervalPetal;
  if (!reduceMotion) {
    ambientIntervalHeart = setInterval(spawnHeart, 900);
    ambientIntervalPetal = setInterval(spawnPetal, 1100);
    for (let i = 0; i < 6; i++) setTimeout(spawnHeart, i * 300);
    for (let i = 0; i < 6; i++) setTimeout(spawnPetal, i * 400);
  }

  /* ---------------------------------------------------------
     HEART BURST ON BUTTON CLICK
  --------------------------------------------------------- */
  const heartBurstLayer = document.getElementById("heartBurstLayer");

  function burstHearts(x, y) {
    const count = 14;
    for (let i = 0; i < count; i++) {
      const h = document.createElement("div");
      h.className = "burst-heart";
      h.textContent = "❤";
      h.style.left = `${x}px`;
      h.style.top = `${y}px`;
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
      const distance = 60 + Math.random() * 90;
      h.style.setProperty("--bx", `${Math.cos(angle) * distance}px`);
      h.style.setProperty("--by", `${Math.sin(angle) * distance}px`);
      h.style.setProperty("--br", `${Math.random() * 360}deg`);
      heartBurstLayer.appendChild(h);
      setTimeout(() => h.remove(), 1200);
    }
  }

  function attachBurst(btn) {
    if (!btn) return;
    btn.addEventListener("click", (e) => {
      const rect = btn.getBoundingClientRect();
      burstHearts(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
  }
  attachBurst(document.getElementById("openHeartBtn"));
  attachBurst(document.getElementById("journeyBtn"));

  document.getElementById("openHeartBtn")?.addEventListener("click", () => {
    document.getElementById("page2")?.scrollIntoView({ behavior: "smooth" });
  });
  document.getElementById("journeyBtn")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------------------------------------------------------
     MUSIC TOGGLE
  --------------------------------------------------------- */
  const musicToggle = document.getElementById("musicToggle");
  const musicLabel = document.getElementById("musicLabel");
  const musicIcon = document.getElementById("musicIcon");
  const bgMusic = document.getElementById("bgMusic");

  musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play().catch(() => {
        musicLabel.textContent = "Add music file";
      });
      musicToggle.classList.add("playing");
      musicLabel.textContent = "Pause Music";
      musicIcon.textContent = "♫";
    } else {
      bgMusic.pause();
      musicToggle.classList.remove("playing");
      musicLabel.textContent = "Play Music";
      musicIcon.textContent = "♪";
    }
  });
})();
