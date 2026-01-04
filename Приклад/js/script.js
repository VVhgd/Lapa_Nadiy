// Carousel functionality
const items = document.querySelectorAll(".item")
const indicators = document.querySelectorAll(".indicator")
let index = 0
let autoPlayInterval

function showSlide(i) {
  // Remove active class from all items and indicators
  items.forEach((item) => item.classList.remove("active"))
  indicators.forEach((ind) => ind.classList.remove("active"))

  // Add active class to current slide and indicator
  items[i].classList.add("active")
  indicators[i].classList.add("active")
}

function nextSlide() {
  index = (index + 1) % items.length
  showSlide(index)
}

function prevSlide() {
  index = (index - 1 + items.length) % items.length
  showSlide(index)
}

function goToSlide(slideIndex) {
  index = slideIndex
  showSlide(index)
}

// Improved carousel control with smooth transitions
document.querySelector(".control.left").onclick = () => {
  prevSlide()
  resetAutoPlay()
}

document.querySelector(".control.right").onclick = () => {
  nextSlide()
  resetAutoPlay()
}

indicators.forEach((indicator, i) => {
  indicator.addEventListener("click", () => {
    goToSlide(i)
    resetAutoPlay()
  })
})

// Autoplay functionality
function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    nextSlide()
  }, 5000)
}

function resetAutoPlay() {
  clearInterval(autoPlayInterval)
  startAutoPlay()
}

startAutoPlay()

// Pause on hover
document.querySelector(".carousel").addEventListener("mouseenter", () => {
  clearInterval(autoPlayInterval)
})

document.querySelector(".carousel").addEventListener("mouseleave", () => {
  startAutoPlay()
})

// Language translation functionality
let currentLang = "uk"

const translations = {
  uk: {
    elements: {},
  },
  en: {
    elements: {},
  },
}

// Collect all translatable elements on page load
document.addEventListener("DOMContentLoaded", () => {
  const translatableElements = document.querySelectorAll("[data-uk][data-en]")

  translatableElements.forEach((el) => {
    const ukText = el.getAttribute("data-uk")
    const enText = el.getAttribute("data-en")

    if (!translations.uk.elements[ukText]) {
      translations.uk.elements[ukText] = []
      translations.en.elements[enText] = []
    }

    translations.uk.elements[ukText].push(el)
    translations.en.elements[enText].push(el)
  })

  // Load saved language on page load
  const savedLang = localStorage.getItem("currentLang") || "uk"
  if (savedLang === "en") {
    translatePage("en")
  }
})

function translatePage(lang) {
  const translatableElements = document.querySelectorAll("[data-uk][data-en]")

  translatableElements.forEach((el) => {
    if (lang === "en") {
      el.textContent = el.getAttribute("data-en")
    } else {
      el.textContent = el.getAttribute("data-uk")
    }
  })

  currentLang = lang
  localStorage.setItem("currentLang", lang)

  // Update button text
  const langBtn = document.getElementById("langToggle")
  langBtn.textContent = lang === "uk" ? "EN" : "УК"

  // Update placeholders for help page
  if (typeof window.updatePlaceholders === "function") {
    window.updatePlaceholders()
  }

  // Re-render animals if on catalog page
  if (typeof window.renderAnimals === "function") {
    window.renderAnimals()
  }

  // Update cart display if on cart page
  if (typeof window.updateCartDisplay === "function") {
    window.updateCartDisplay()
  }
}

// Language toggle button
document.getElementById("langToggle").addEventListener("click", () => {
  const newLang = currentLang === "uk" ? "en" : "uk"
  translatePage(newLang)
})

// Smooth scroll for menu links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Improved header scroll collapse functionality
const header = document.getElementById("mainHeader")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 80) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// Parallax effect for hero image
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroImage = document.querySelector(".hero-image")

  if (heroImage && scrolled < 800) {
    heroImage.style.transform = `translateY(${scrolled * 0.3}px)`
  }
})

// Animation on scroll for sections
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

document.querySelectorAll(".feature-card, .animal-category").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "all 0.8s ease-out"
  observer.observe(el)
})
