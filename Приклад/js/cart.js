// Sample animal data (same as catalog)
const animalsData = [
  {
    id: 1,
    name: "Рекс",
    type: "dog",
    breed: "Німецька вівчарка",
    breedEn: "German Shepherd",
    ageText: "2 роки",
    ageTextEn: "2 years",
    desc: "Активний та дружелюбний собака",
    descEn: "Active and friendly dog",
    emoji: "🐕",
  },
  {
    id: 2,
    name: "Мурка",
    type: "cat",
    breed: "Дворова",
    breedEn: "Domestic",
    ageText: "3 роки",
    ageTextEn: "3 years",
    desc: "Спокійна та ласкава кішка",
    descEn: "Calm and affectionate cat",
    emoji: "🐈",
  },
  {
    id: 3,
    name: "Макс",
    type: "dog",
    breed: "Лабрадор",
    breedEn: "Labrador",
    ageText: "8 місяців",
    ageTextEn: "8 months",
    desc: "Веселе цуценя",
    descEn: "Cheerful puppy",
    emoji: "🐕",
  },
  {
    id: 4,
    name: "Соня",
    type: "cat",
    breed: "Сіамська",
    breedEn: "Siamese",
    ageText: "4 місяці",
    ageTextEn: "4 months",
    desc: "Цікаве та грайливе кошеня",
    descEn: "Curious and playful kitten",
    emoji: "🐈",
  },
  {
    id: 5,
    name: "Барсик",
    type: "dog",
    breed: "Джек Рассел",
    breedEn: "Jack Russell",
    ageText: "4 роки",
    ageTextEn: "4 years",
    desc: "Енергійний та розумний",
    descEn: "Energetic and smart",
    emoji: "🐕",
  },
  {
    id: 6,
    name: "Луна",
    type: "cat",
    breed: "Перська",
    breedEn: "Persian",
    ageText: "1 рік",
    ageTextEn: "1 year",
    desc: "Спокійна довгошерста красуня",
    descEn: "Calm long-haired beauty",
    emoji: "🐈",
  },
]

function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]")
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartDisplay()
  updateCartCount()
}

function removeFromCart(animalId) {
  const cart = getCart()
  const index = cart.indexOf(animalId)
  if (index > -1) {
    cart.splice(index, 1)
    saveCart(cart)
  }
}

function updateCartDisplay() {
  const cart = getCart()
  const cartItems = document.getElementById("cartItems")
  const cartEmpty = document.getElementById("cartEmpty")
  const cartSummary = document.getElementById("cartSummary")
  const totalAnimals = document.getElementById("totalAnimals")
  const checkoutBtn = document.getElementById("checkoutBtn")

  const currentLang = localStorage.getItem("currentLang") || "uk"

  if (cart.length === 0) {
    cartItems.style.display = "none"
    cartSummary.style.display = "none"
    cartEmpty.style.display = "block"
  } else {
    cartItems.style.display = "flex"
    cartSummary.style.display = "block"
    cartEmpty.style.display = "none"

    const animals = cart.map((id) => animalsData.find((a) => a.id === id)).filter(Boolean)

    cartItems.innerHTML = animals
      .map(
        (animal) => `
      <div class="cart-item">
        <div class="cart-item-image">
          ${animal.emoji}
        </div>
        <div class="cart-item-info">
          <h3 class="cart-item-name">${animal.name}</h3>
          <div class="cart-item-meta">
            <span>${currentLang === "uk" ? animal.breed : animal.breedEn}</span>
            <span>•</span>
            <span>${currentLang === "uk" ? animal.ageText : animal.ageTextEn}</span>
          </div>
          <p class="cart-item-desc">${currentLang === "uk" ? animal.desc : animal.descEn}</p>
        </div>
        <div class="cart-item-actions">
          <button class="btn-remove" onclick="removeFromCart(${animal.id})" data-uk="Видалити" data-en="Remove">
            ${currentLang === "uk" ? "Видалити" : "Remove"}
          </button>
        </div>
      </div>
    `,
      )
      .join("")

    totalAnimals.textContent = animals.length
  }

  if (checkoutBtn) {
    checkoutBtn.disabled = cart.length === 0
  }
}

function updateCartCount() {
  const cart = getCart()
  const countElements = document.querySelectorAll(".cart-count")
  countElements.forEach((el) => {
    el.textContent = cart.length
  })
}

// Checkout handler
const checkoutBtn = document.getElementById("checkoutBtn")
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    const currentLang = localStorage.getItem("currentLang") || "uk"
    alert(
      currentLang === "uk"
        ? "Дякуємо за ваш інтерес! Наш менеджер зв'яжеться з вами найближчим часом."
        : "Thank you for your interest! Our manager will contact you shortly.",
    )

    // Clear cart after checkout
    saveCart([])
  })
}

// Initial render
updateCartDisplay()
updateCartCount()
