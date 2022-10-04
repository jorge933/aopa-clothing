import { nextSlide, dot } from "./scripts/carousel.js";
import { initItems } from "./scripts/init-items.js";
import { newItem, checkCoupon, finishBuy } from "./scripts/cart.js";

const $buttonsCarousel = document.querySelectorAll(".buttons-slide button");
const $dots = document.querySelectorAll(".dot");
const $openCart = document.querySelector(".cart");
const $cart = document.querySelector(".modal-cart");
const $closeCart = document.querySelector(".close");
const $checkCoupon = document.querySelector(".check-coupon");
const $finishBuy = document.querySelector(".buy");

$openCart.addEventListener("click", () => {
  $cart.classList.add("active");
});

$closeCart.addEventListener("click", () => {
  $cart.classList.remove("active");
});

$buttonsCarousel.forEach(($button) => {
  $button.addEventListener("click", nextSlide);
});

$dots.forEach(($dot) => {
  $dot.addEventListener("click", dot);
});

initItems();

const $add = document.querySelectorAll(".add");

$add.forEach(($button) => {
  $button.addEventListener("click", () => {
    const $buttonParentElement = $button.parentElement;
    newItem($buttonParentElement);
  });
});

$checkCoupon.addEventListener("click", checkCoupon);
$finishBuy.addEventListener("click", finishBuy);
