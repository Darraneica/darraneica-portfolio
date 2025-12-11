document.addEventListener("DOMContentLoaded", () => {
  // Custom Cursor
  const cursor = document.querySelector(".custom-cursor")
  const cursorTrail = document.querySelector(".cursor-trail")

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    setTimeout(() => {
      cursorTrail.style.left = e.clientX + "px"
      cursorTrail.style.top = e.clientY + "px"
    }, 50)
  })

  document.querySelectorAll("button, a, .game-card").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(1.5)"
    })
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)"
    })
  })

  // Theme Toggle
  const themeToggle = document.getElementById("themeToggle")
  const themeIcon = themeToggle.querySelector(".theme-icon")

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode")
    themeIcon.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙"
  })

  // Smooth Scroll
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const target = document.querySelector(link.getAttribute("href"))
      target.scrollIntoView({ behavior: "smooth" })

      document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"))
      link.classList.add("active")
    })
  })

  // Scroll Indicator
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  window.addEventListener("scroll", () => {
    let current = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  document.querySelectorAll(".about-card, .game-card, .work-item, .contact-item").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

function scrollToGames() {
  document.getElementById("games").scrollIntoView({ behavior: "smooth" })
}

function scrollToWork() {
  document.getElementById("work").scrollIntoView({ behavior: "smooth" })
}

// Game Modal Functions
function openGame(gameType) {
  const modal = document.getElementById("gameModal")
  const modalGame = document.getElementById("modalGame")

  modal.classList.add("active")

  switch (gameType) {
    case "memory":
      modalGame.innerHTML = createMemoryGame()
      initMemoryGame()
      break
    case "catch":
      modalGame.innerHTML = createCatchGame()
      initCatchGame()
      break
    case "typing":
      modalGame.innerHTML = createTypingGame()
      initTypingGame()
      break
    case "color":
      modalGame.innerHTML = createColorGame()
      initColorGame()
      break
  }
}

function closeGame() {
  const modal = document.getElementById("gameModal")
  modal.classList.remove("active")
  document.getElementById("modalGame").innerHTML = ""
}

// Memory Match Game
function createMemoryGame() {
  return `
        <div class="memory-game">
            <h2 style="text-align: center; margin-bottom: 1rem; color: var(--color-text);">Memory Match</h2>
            <div class="game-stats" style="display: flex; justify-content: space-around; margin-bottom: 2rem; font-size: 1.2rem;">
                <div>Moves: <span id="moves">0</span></div>
                <div>Matches: <span id="matches">0</span></div>
                <div>Time: <span id="time">0</span>s</div>
            </div>
            <div class="memory-grid" style="display: grid; grid-template-columns: repeat(4, 100px); gap: 1rem; justify-content: center;"></div>
            <button onclick="initMemoryGame()" style="display: block; margin: 2rem auto; padding: 1rem 2rem; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border: none; border-radius: 50px; font-weight: 600; cursor: pointer;">New Game</button>
        </div>
    `
}

function initMemoryGame() {
  const emojis = ["🎮", "🎨", "🎭", "🎪", "🎯", "🎲", "🎸", "🎹"]
  const cards = [...emojis, ...emojis]
  cards.sort(() => Math.random() - 0.5)

  const grid = document.querySelector(".memory-grid")
  grid.innerHTML = ""

  let flipped = []
  let moves = 0
  let matches = 0
  const startTime = Date.now()
  let timer

  cards.forEach((emoji, index) => {
    const card = document.createElement("div")
    card.className = "memory-card"
    card.style.cssText = `
            width: 100px;
            height: 100px;
            background: var(--gradient-2);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            cursor: pointer;
            transition: transform 0.3s ease;
            position: relative;
        `
    card.dataset.emoji = emoji
    card.dataset.index = index
    card.innerHTML =
      '<div style="position: absolute; width: 100%; height: 100%; background: var(--color-surface); border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 2rem;">❓</div>'

    card.addEventListener("click", () => {
      if (flipped.length < 2 && !card.classList.contains("flipped")) {
        card.classList.add("flipped")
        card.querySelector("div").textContent = emoji
        flipped.push(card)

        if (!timer) {
          timer = setInterval(() => {
            document.getElementById("time").textContent = Math.floor((Date.now() - startTime) / 1000)
          }, 1000)
        }

        if (flipped.length === 2) {
          moves++
          document.getElementById("moves").textContent = moves

          if (flipped[0].dataset.emoji === flipped[1].dataset.emoji) {
            matches++
            document.getElementById("matches").textContent = matches
            flipped[0].style.opacity = "0.5"
            flipped[1].style.opacity = "0.5"
            flipped = []

            if (matches === emojis.length) {
              clearInterval(timer)
              setTimeout(
                () =>
                  alert(
                    `Congratulations! You won in ${moves} moves and ${Math.floor((Date.now() - startTime) / 1000)} seconds!`,
                  ),
                300,
              )
            }
          } else {
            setTimeout(() => {
              flipped.forEach((c) => {
                c.classList.remove("flipped")
                c.querySelector("div").textContent = "❓"
              })
              flipped = []
            }, 1000)
          }
        }
      }
    })

    grid.appendChild(card)
  })

  document.getElementById("moves").textContent = "0"
  document.getElementById("matches").textContent = "0"
  document.getElementById("time").textContent = "0"
}

// Catch the Stars Game
function createCatchGame() {
  return `
        <div class="catch-game">
            <h2 style="text-align: center; margin-bottom: 1rem; color: var(--color-text);">Catch the Stars</h2>
            <div class="game-stats" style="text-align: center; margin-bottom: 1rem; font-size: 1.2rem;">
                Score: <span id="catch-score">0</span> | Time: <span id="catch-time">30</span>s
            </div>
            <canvas id="catchCanvas" width="600" height="400" style="border: 3px solid var(--color-primary); border-radius: 15px; display: block; margin: 0 auto; background: var(--color-bg);"></canvas>
            <button onclick="initCatchGame()" style="display: block; margin: 2rem auto; padding: 1rem 2rem; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border: none; border-radius: 50px; font-weight: 600; cursor: pointer;">New Game</button>
        </div>
    `
}

function initCatchGame() {
  const canvas = document.getElementById("catchCanvas")
  const ctx = canvas.getContext("2d")

  let score = 0
  let timeLeft = 30
  let gameActive = true
  let basketX = canvas.width / 2
  const basketWidth = 80
  const basketHeight = 20

  const stars = []

  function createStar() {
    stars.push({
      x: Math.random() * (canvas.width - 30),
      y: -30,
      speed: 2 + Math.random() * 3,
      size: 20 + Math.random() * 10,
    })
  }

  setInterval(() => {
    if (gameActive) createStar()
  }, 1000)

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect()
    basketX = e.clientX - rect.left - basketWidth / 2
    basketX = Math.max(0, Math.min(canvas.width - basketWidth, basketX))
  })

  const timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--
      document.getElementById("catch-time").textContent = timeLeft
    } else {
      gameActive = false
      clearInterval(timer)
      alert(`Game Over! Your score: ${score}`)
    }
  }, 1000)

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw basket
    ctx.fillStyle = "#ff6b9d"
    ctx.fillRect(basketX, canvas.height - 40, basketWidth, basketHeight)
    ctx.fillRect(basketX, canvas.height - 40, 10, 20)
    ctx.fillRect(basketX + basketWidth - 10, canvas.height - 40, 10, 20)

    // Update and draw stars
    for (let i = stars.length - 1; i >= 0; i--) {
      const star = stars[i]
      star.y += star.speed

      // Draw star
      ctx.font = `${star.size}px Arial`
      ctx.fillText("⭐", star.x, star.y)

      // Check collision
      if (
        star.y + star.size > canvas.height - 40 &&
        star.y < canvas.height - 20 &&
        star.x > basketX &&
        star.x < basketX + basketWidth
      ) {
        score++
        document.getElementById("catch-score").textContent = score
        stars.splice(i, 1)
      } else if (star.y > canvas.height) {
        stars.splice(i, 1)
      }
    }

    if (gameActive) {
      requestAnimationFrame(gameLoop)
    }
  }

  gameLoop()
}

// Typing Speed Game
let timerInterval;

function createTypingGame() {
  return `
        <div class="typing-game">
            <h2 style="text-align: center; margin-bottom: 1rem; color: var(--color-text);">Speed Typing Challenge</h2>

            <div class="game-stats" style="text-align: center; margin-bottom: 1.5rem; font-size: 1.2rem;">
                WPM: <span id="wpm">0</span> | 
                Accuracy: <span id="accuracy">100</span>% |
                Time: <span id="timer">0.00s</span>
            </div>

            <div id="typing-text" style="background: var(--color-bg); padding: 2rem; border-radius: 15px; font-size: 1.5rem; line-height: 2; margin-bottom: 2rem; min-height: 100px;"></div>

            <input 
                type="text" 
                id="typing-input" 
                placeholder="Start typing here..." 
                style="width: 100%; padding: 1rem; font-size: 1.2rem; border: 2px solid var(--color-primary); border-radius: 10px; background: var(--color-surface); color: var(--color-text);">

            <button 
                onclick="initTypingGame()" 
                style="display: block; margin: 2rem auto; padding: 1rem 2rem; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border: none; border-radius: 50px; font-weight: 600; cursor: pointer;">
                New Text
            </button>
        </div>
    `;
}

function initTypingGame() {
  const texts = [
    "The quick brown fox jumps over the lazy dog.",
    "Programming is the art of telling another human what one wants the computer to do.",
    "Code is like humor. When you have to explain it, it's bad.",
    "First, solve the problem. Then, write the code.",
    "Experience is the name everyone gives to their mistakes.",
    "Darraneica will become a software developer soon."
  ];

  // Reset timer
  clearInterval(timerInterval);
  document.getElementById("timer").textContent = "0.00s";

  const text = texts[Math.floor(Math.random() * texts.length)];
  const typingText = document.getElementById("typing-text");
  const typingInput = document.getElementById("typing-input");

  typingText.innerHTML = text
    .split("")
    .map((char) => `<span>${char}</span>`)
    .join("");

  // Clear input
  typingInput.value = "";

  let startTime;
  let errors = 0;

  // Reset event listener to avoid duplicates
  const newInput = typingInput.cloneNode(true);
  typingInput.parentNode.replaceChild(newInput, typingInput);

  newInput.addEventListener("input", (e) => {
    if (!startTime) {
      startTime = Date.now();

      // Start timer
      timerInterval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        document.getElementById("timer").textContent = elapsed.toFixed(2) + "s";
      }, 50);
    }

    const typed = e.target.value;
    const spans = typingText.querySelectorAll("span");

    spans.forEach((span, index) => {
      if (index < typed.length) {
        if (typed[index] === span.textContent) {
          span.style.color = "#43e97b";
        } else {
          span.style.color = "#f5576c";
          if (!span.classList.contains("error-counted")) {
            errors++;
            span.classList.add("error-counted");
          }
        }
      } else {
        span.style.color = "var(--color-text-light)";
        span.classList.remove("error-counted");
      }
    });

    const timeElapsed = (Date.now() - startTime) / 1000 / 60;
    const wpm = Math.round(typed.length / 5 / timeElapsed);
    const accuracy = Math.round(((typed.length - errors) / typed.length) * 100);

    document.getElementById("wpm").textContent = wpm || 0;
    document.getElementById("accuracy").textContent = accuracy || 100;

    // Completed!
    if (typed === text) {
      clearInterval(timerInterval);

      // Grab the timer value RIGHT HERE
      const timerValue = document.getElementById("timer").textContent;

      setTimeout(() => {
        alert(`Completed! WPM: ${wpm}, Accuracy: ${accuracy}%, Time: ${timerValue}`);
        initTypingGame(); // load next challenge
      }, 150);
    }
  });

  newInput.focus();
}


// Color Match Game
function createColorGame() {
  return `
        <div class="color-game">
            <h2 style="text-align: center; margin-bottom: 1rem; color: var(--color-text);">Color Rush</h2>
            <div class="game-stats" style="text-align: center; margin-bottom: 2rem; font-size: 1.2rem;">
                Score: <span id="color-score">0</span> | Time: <span id="color-time">30</span>s
            </div>
            <div id="color-display" style="width: 300px; height: 300px; margin: 0 auto 2rem; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 4rem; font-weight: 800; box-shadow: var(--shadow-lg);"></div>
            <div id="color-options" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; max-width: 500px; margin: 0 auto;"></div>
        </div>
    `
}

function initColorGame() {
  const colors = [
    { name: "RED", hex: "#ff6b9d" },
    { name: "BLUE", hex: "#667eea" },
    { name: "GREEN", hex: "#43e97b" },
    { name: "YELLOW", hex: "#ffa801" },
    { name: "PURPLE", hex: "#764ba2" },
    { name: "ORANGE", hex: "#f5576c" },
    { name: "CYAN", hex: "#00f2fe" },
    { name: "PINK", hex: "#f093fb" },
  ]

  let score = 0
  let timeLeft = 30
  let gameActive = true

  const timer = setInterval(() => {
    if (timeLeft > 0 && gameActive) {
      timeLeft--
      document.getElementById("color-time").textContent = timeLeft
    } else {
      gameActive = false
      clearInterval(timer)
      alert(`Game Over! Your score: ${score}`)
    }
  }, 1000)

  function newRound() {
    if (!gameActive) return

    const correctColor = colors[Math.floor(Math.random() * colors.length)]
    const textColor = colors[Math.floor(Math.random() * colors.length)]

    const display = document.getElementById("color-display")
    display.textContent = correctColor.name
    display.style.color = textColor.hex
    display.style.background = `linear-gradient(135deg, ${correctColor.hex}22, ${textColor.hex}22)`

    const options = [
      correctColor,
      ...colors
        .filter((c) => c !== correctColor)
        .sort(() => Math.random() - 0.5)
        .slice(0, 5),
    ].sort(() => Math.random() - 0.5)

    const optionsContainer = document.getElementById("color-options")
    optionsContainer.innerHTML = ""

    options.forEach((color) => {
      const btn = document.createElement("button")
      btn.textContent = color.name
      btn.style.cssText = `
                padding: 1.5rem;
                font-size: 1.2rem;
                font-weight: 600;
                border: none;
                border-radius: 15px;
                background: ${color.hex};
                color: white;
                cursor: pointer;
                transition: transform 0.2s ease;
            `
      btn.addEventListener("mouseenter", () => (btn.style.transform = "scale(1.05)"))
      btn.addEventListener("mouseleave", () => (btn.style.transform = "scale(1)"))
      btn.addEventListener("click", () => {
        if (color === textColor) {
          score++
          document.getElementById("color-score").textContent = score
          newRound()
        } else {
          score = Math.max(0, score - 1)
          document.getElementById("color-score").textContent = score
        }
      })
      optionsContainer.appendChild(btn)
    })
  }

  newRound()
}
