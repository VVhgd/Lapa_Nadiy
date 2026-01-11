// Carousel functionality
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel")
  const items = carousel.querySelectorAll(".item")
  const leftBtn = carousel.querySelector(".control.left")
  const rightBtn = carousel.querySelector(".control.right")
  const indicators = carousel.querySelectorAll(".indicator")

  let currentIndex = 0
  const totalItems = items.length

  function showSlide(index) {
    // Remove active class from all items and indicators
    items.forEach((item) => item.classList.remove("active"))
    indicators.forEach((indicator) => indicator.classList.remove("active"))

    // Add active class to current item and indicator
    items[index].classList.add("active")
    indicators[index].classList.add("active")
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalItems
    showSlide(currentIndex)
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems
    showSlide(currentIndex)
  }

  // Event listeners for buttons
  rightBtn.addEventListener("click", nextSlide)
  leftBtn.addEventListener("click", prevSlide)

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentIndex = index
      showSlide(currentIndex)
    })
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide()
    } else if (e.key === "ArrowRight") {
      nextSlide()
    }
  })

  // Auto-play carousel every 5 seconds
  setInterval(nextSlide, 5000)
})
