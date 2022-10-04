import { items } from "./items-and-coupons.js";

const $highlight = document.querySelector(".highlight .products");
const $casual = document.querySelector(".casual .products");

console.log($highlight);
console.log($casual);

const highlights = items
  .sort((obj1, obj2) => {
    return obj1.purchased < obj2.purchased ? -1 : true;
  })
  .reverse();

export function initItems() {
  items.forEach((item) => {
    addProductInDOM(item, $casual);
  });

  highlights.forEach((item) => {
    addProductInDOM(item, $highlight, true);
  });
}

function addProductInDOM(product, $productsContainer, isHighlight = false) {
  const { name, price, imageUrl, purchased } = product;
  const $purchased = `<span class="purchased">Purchased: ${purchased}</span>`;

  $productsContainer.innerHTML += `
        <div class="product">
            <h1>${name}</h1>

            <div>
                <img src="${imageUrl}" alt="Black T-Shirt"> 
                <span class="price">$${price}</span>
            </div>
            ${isHighlight ? $purchased : ""}
            <button class="add">Add</button>
        </div>
    `;
}
