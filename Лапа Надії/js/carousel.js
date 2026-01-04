const items = document.querySelectorAll(".item");
let index = 0;

function showSlide(i) {
  items.forEach(item => item.classList.remove("active"));
  items[i].classList.add("active");
}

document.querySelector(".control.left").onclick = () => {
  index = (index - 1 + items.length) % items.length;
  showSlide(index);
};

document.querySelector(".control.right").onclick = () => {
  index = (index + 1) % items.length;
  showSlide(index);
};

setInterval(() => {
  index = (index + 1) % items.length;
  showSlide(index);
}, 4000);
