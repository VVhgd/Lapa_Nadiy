// Sample animal data
const animalsData = [
  {
    id: 1,
    name: "Рекс",
    type: "dog",
    age: "young",
    size: "large",
    breed: "Німецька вівчарка",
    ageText: "2 роки",
    ageTextEn: "2 years",
    desc: "Активний та дружелюбний собака, ідеальний для активних сімей",
    descEn: "Active and friendly dog, perfect for active families",
    emoji: "🐕",
  },
  {
    id: 2,
    name: "Мурка",
    type: "cat",
    age: "adult",
    size: "small",
    breed: "Дворова",
    ageText: "3 роки",
    ageTextEn: "3 years",
    desc: "Спокійна та ласкава кішка, любить домашній затишок",
    descEn: "Calm and affectionate cat, loves home comfort",
    emoji: "🐈",
  },
  {
    id: 3,
    name: "Макс",
    type: "dog",
    age: "puppy",
    size: "medium",
    breed: "Лабрадор",
    ageText: "8 місяців",
    ageTextEn: "8 months",
    desc: "Веселе цуценя, яке обожнює гратися та вчитися",
    descEn: "Cheerful puppy who loves to play and learn",
    emoji: "🐕",
  },
  {
    id: 4,
    name: "Соня",
    type: "cat",
    age: "kitten",
    size: "small",
    breed: "Сіамська",
    ageText: "4 місяці",
    ageTextEn: "4 months",
    desc: "Цікаве та грайливе кошеня з блакитними очима",
    descEn: "Curious and playful kitten with blue eyes",
    emoji: "🐈",
  },
  {
    id: 5,
    name: "Барсик",
    type: "dog",
    age: "adult",
    size: "small",
    breed: "Джек Рассел",
    ageText: "4 роки",
    ageTextEn: "4 years",
    desc: "Енергійний та розумний, любить довгі прогулянки",
    descEn: "Energetic and smart, loves long walks",
    emoji: "🐕",
  },
  {
    id: 6,
    name: "Луна",
    type: "cat",
    age: "young",
    size: "small",
    breed: "Перська",
    ageText: "1 рік",
    ageTextEn: "1 year",
    desc: "Спокійна довгошерста красуня, потребує догляду",
    descEn: "Calm long-haired beauty, requires grooming",
    emoji: "🐈",
  },
]

let currentFilters = {
  type: "all",
  age: "all",
  size: "all",
}

// Get current page
const currentPage = window.location.pathname.split("/").pop()

// Filter animals based on page
let displayAnimals = animalsData
if (currentPage === "dogs.html") {
  displayAnimals = animalsData.filter((a) => a.type === "dog")
} else if (currentPage === "cats.html") {
  displayAnimals = animalsData.filter((a) => a.type === "cat")
}

function renderAnimals() {
  const grid = document.getElementById("animalsGrid")
  const filtered = displayAnimals.filter((animal) => {
    if (currentFilters.type !== "all" && animal.type !== currentFilters.type) return false
    if (currentFilters.age !== "all" && animal.age !== currentFilters.age) return false
    if (currentFilters.size !== "all" && animal.size !== currentFilters.size) return false
    return true
  })

  const currentLang = localStorage.getItem("currentLang") || "uk"

  grid.innerHTML = filtered
    .map(
      (animal) => `
    <div class="animal-card" data-id="${animal.id}">
      <div class="animal-image">
        ${animal.emoji}
      </div>
      <div class="animal-info">
        <h3 class="animal-name">${animal.name}</h3>
        <div class="animal-meta">
          <span>${currentLang === "uk" ? animal.breed : animal.breed}</span>
          <span>•</span>
          <span>${currentLang === "uk" ? animal.ageText : animal.ageTextEn}</span>
        </div>
        <p class="animal-desc">${currentLang === "uk" ? animal.desc : animal.descEn}</p>
        <div class="animal-actions">
          <button class="btn-adopt" data-uk="Усиновити" data-en="Adopt">${currentLang === "uk" ? "Усиновити" : "Adopt"}</button>
          <button class="btn-cart" onclick="addToCart(${animal.id})" aria-label="${currentLang === "uk" ? "Додати до кошика" : "Add to cart"}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
    )
    .join("")

  updateCartCount()
}

// Filter handlers
const typeFilter = document.getElementById("typeFilter")
const ageFilter = document.getElementById("ageFilter")
const sizeFilter = document.getElementById("sizeFilter")
const resetBtn = document.getElementById("resetFilters")

if (typeFilter) {
  typeFilter.addEventListener("change", (e) => {
    currentFilters.type = e.target.value
    renderAnimals()
  })
}

if (ageFilter) {
  ageFilter.addEventListener("change", (e) => {
    currentFilters.age = e.target.value
    renderAnimals()
  })
}

if (sizeFilter) {
  sizeFilter.addEventListener("change", (e) => {
    currentFilters.size = e.target.value
    renderAnimals()
  })
}

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    currentFilters = { type: "all", age: "all", size: "all" }
    if (typeFilter) typeFilter.value = "all"
    if (ageFilter) ageFilter.value = "all"
    if (sizeFilter) sizeFilter.value = "all"
    renderAnimals()
  })
}

// Cart functionality
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]")
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
}

function addToCart(animalId) {
  const cart = getCart()
  if (!cart.includes(animalId)) {
    cart.push(animalId)
    saveCart(cart)

    // Show feedback
    const currentLang = localStorage.getItem("currentLang") || "uk"
    alert(currentLang === "uk" ? "Додано до кошика!" : "Added to cart!")
  }
}

function updateCartCount() {
  const cart = getCart()
  const countElements = document.querySelectorAll(".cart-count")
  countElements.forEach((el) => {
    el.textContent = cart.length
  })
}

// Initial render
renderAnimals()
