import { items, coupons } from "./items-and-coupons.js";

const cartInStorage = localStorage.getItem("cart");
const cart = cartInStorage ? JSON.parse(cartInStorage) : [];

const $totalPriceHeader = document.querySelector(".cart span");
const $totalPriceCart = document.querySelector(".modal-cart span span");
const $productsCart = document.querySelector(".container .products");

showProducts();
calcPrice();

export function newItem($product) {
  const productName = $product.querySelector("h1").innerHTML;
  const emptyCart = cart.some((item) => item.name === productName);

  if (!emptyCart) {
    const itemObj = items.find((product) => {
      if (product.name === productName) {
        const productObj = product;
        delete productObj.purchased;
        product.quantity = 0;
        return productObj;
      }
    });
    cart.push(itemObj);
  }
  changeQuantityItem(productName);
}

function changeQuantityItem(itemName, increase = true) {
  cart.find((item, index) => {
    if (item.name === itemName) {
      increase ? cart[index].quantity++ : cart[index].quantity--;
      showProducts();
      setCartInStorage();
    }
  });
}

function deleteItem(itemName) {
  cart.find((item, index) => {
    if (item.name === itemName) {
      cart.splice(index, 1);
      showProducts();
      setCartInStorage();
      return;
    }
  });
}

function showProducts() {
  if (!cart.length) return $productsCart.innerHTML = "<p class='no-products'>No products in cart!</p>";
  $productsCart.innerHTML = "";
  calcPrice();

  cart.forEach((product) => {
    const $product = document.createElement("div");
    $product.classList.add("product");

    $product.innerHTML += `<img src="${product.imageUrl}" alt="${product.name}">`;
    const $infos = document.createElement("div");
    $infos.classList.add("infos");

    $infos.innerHTML += `<h1 class="name">${product.name}</h1>`;

    const $actions = document.createElement("div");
    $actions.classList.add("actions");

    const $removeOne = document.createElement("button");
    $removeOne.classList.add("removeOne");
    $removeOne.innerHTML = "&#9472;";
    $removeOne.addEventListener("click", () => {
      if (product.quantity >= 2) {
        changeQuantityItem(product.name, false);
        return;
      }

      deleteItem(product.name);
    });

    const $input = document.createElement("input");
    $input.value = product.quantity;
    $input.type = "number";
    $input.max = "99";
    $input.min = "1";
    $input.addEventListener("change", (event) => {
      const { value } = event.srcElement;
      const valueNumber = parseInt(value);

      if (valueNumber > 0 && valueNumber < 99) {
        cart.find((item, index) => {
          if (item.name === product.name) {
            cart[index].quantity = valueNumber;
          }
        });
      }
      showProducts();
      setCartInStorage();
    });

    const $addOne = document.createElement("button");
    $addOne.classList.add("addOne");
    $addOne.innerHTML = "&#43;";
    $addOne.addEventListener("click", () => {
      if (product.quantity < 99) changeQuantityItem(product.name);
    });

    const totalPrice = (product.quantity * product.price).toFixed(2);
    $infos.innerHTML += `<span class="total-price">$${totalPrice}</span>`;

    $productsCart.appendChild($product);
    $product.appendChild($infos);
    $infos.appendChild($actions);
    $actions.appendChild($removeOne);
    $actions.appendChild($input);
    $actions.appendChild($addOne);
  });
}

function calcPrice() {
  let totalPrice;

  cart.forEach((item) => {
    const price = item.quantity * item.price;
    totalPrice ? (totalPrice += price) : (totalPrice = price);
  });

  if (!totalPrice) totalPrice = 0;

  const maskedPrice = totalPrice.toFixed(2);

  $totalPriceHeader.innerHTML = `$${maskedPrice}`;
  $totalPriceCart.innerHTML = `$${maskedPrice}`;
}

function setCartInStorage() {
  const cartStringify = JSON.stringify(cart);
  localStorage.setItem("cart", cartStringify);
}

export function checkCoupon(event) {
  const $coupon = document.querySelector(".coupon");
  const couponToCheck = $coupon.value;
  coupons.find((couponArray) => {
    const coupon = couponArray.coupon;
    if (coupon === couponToCheck) {
      cart.forEach((items, index) => {
        cart[index].price -= (cart[index].price * couponArray.discount) / 100;
      });
      showProducts();
      setCartInStorage();
      event.srcElement.disabled = true;
      const $appliedCoupon = document.querySelector(".applied");
      $appliedCoupon.classList.add("active");
      setTimeout(() => {
        $appliedCoupon.classList.remove("active");
      }, 5000);
      return;
    }
    const $notAppliedCoupon = document.querySelector(".not-applied");
    $notAppliedCoupon.classList.add("active");
    setTimeout(() => {
      $notAppliedCoupon.classList.remove("active");
    }, 5000);
  });
}

export function finishBuy() {
  const cartLength = cart.length;
  const gifName = cartLength > 0 ? "check" : "unchecked";
  const $body = document.body;
  const $cart = document.querySelector(".modal-cart");
  const $container = document.createElement("div");
  const messageStyleClass = gifName === "check" ? "applied" : "not-applied";
  const message = gifName === "check" ? "Buy Approved" : "Buy Fail";
  const $message = `<p class="warning active ${messageStyleClass}">${message}</p>`;

  if (gifName === "check") {
    $totalPriceHeader.innerHTML = `$0.00`;
    $totalPriceCart.innerHTML = `$0.00`;
    $productsCart.innerHTML = "<p class='no-products'>No products in cart!</p>";
    cart.splice(0, cartLength);
    setCartInStorage();
  }

  $container.innerHTML += `<img class="gif" src="/images/gif/${gifName}.gif">
  ${$message}
  `;
  $body.appendChild($container);

  $cart.classList.remove("active");
  setTimeout(() => {
    $container.remove();
  }, 2310);
}
