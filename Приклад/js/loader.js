let progress = 0
const progressFill = document.querySelector(".progress-fill")
const progressText = document.querySelector(".progress-text")

// Анімація прогрес-бару
const progressInterval = setInterval(() => {
  if (progress < 100) {
    progress += Math.random() * 15
    if (progress > 100) progress = 100

    progressFill.style.width = progress + "%"
    progressText.textContent = Math.floor(progress) + "%"
  } else {
    clearInterval(progressInterval)
  }
}, 200)

// Переклад для лоадера
const currentLang = localStorage.getItem("currentLang") || "uk"

function translateLoader() {
  const elements = document.querySelectorAll("[data-uk][data-en]")
  elements.forEach((el) => {
    if (currentLang === "en") {
      el.textContent = el.getAttribute("data-en")
    } else {
      el.textContent = el.getAttribute("data-uk")
    }
  })
}

translateLoader()

// Перенаправлення на головну сторінку після завантаження
setTimeout(() => {
  window.location.href = "index.html"
}, 5000)
