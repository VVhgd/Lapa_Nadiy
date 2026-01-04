// Help page functionality
const amountButtons = document.querySelectorAll(".amount-btn")
const customAmountInput = document.querySelector(".custom-amount")
const donateBtn = document.querySelector(".donate-btn-large")

let selectedAmount = 0

amountButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    amountButtons.forEach((b) => b.classList.remove("selected"))
    btn.classList.add("selected")
    selectedAmount = Number.parseInt(btn.dataset.amount)
    customAmountInput.value = ""
  })
})

customAmountInput.addEventListener("input", (e) => {
  amountButtons.forEach((b) => b.classList.remove("selected"))
  selectedAmount = Number.parseInt(e.target.value) || 0
})

donateBtn.addEventListener("click", () => {
  if (selectedAmount > 0) {
    const currentLang = localStorage.getItem("currentLang") || "uk"
    alert(
      currentLang === "uk"
        ? `Дякуємо за внесок ${selectedAmount} грн! Перенаправлення на сторінку оплати...`
        : `Thank you for your donation of ${selectedAmount} UAH! Redirecting to payment page...`,
    )
  } else {
    const currentLang = localStorage.getItem("currentLang") || "uk"
    alert(currentLang === "uk" ? "Будь ласка, оберіть або введіть суму" : "Please select or enter an amount")
  }
})

// Update placeholders on language change
function updatePlaceholders() {
  const currentLang = localStorage.getItem("currentLang") || "uk"
  const placeholder = currentLang === "uk" ? "Інша сума" : "Custom amount"
  if (customAmountInput) {
    customAmountInput.placeholder = placeholder
  }
}

// Call on page load
updatePlaceholders()
