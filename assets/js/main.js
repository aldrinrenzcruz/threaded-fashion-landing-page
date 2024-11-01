const shoppingCartContainer = document.querySelector("#shopping-cart-container");
const shoppingCartBtn = document.querySelector("#shopping-cart-btn");
const shoppingCartCounter = document.querySelector("#shopping-cart-counter-ui");
const recentlyBoughtSectionCardsContainer = document.querySelector(".custom-card-group-container");

let user_cart_data = [];

window.addEventListener("load", function () { loadCart(); });

document.addEventListener("DOMContentLoaded", function () {
  renderRecentlyBoughtSectionCards();
});

function renderRecentlyBoughtSectionCards() {
  shop_items_data.forEach((item, index) => {
    const cardHTML = `
      <div class="custom-card">
        <img src="${item.imgSrc}" alt="Product Image">
        <div class="custom-card-body">
          <p class="product-title">${item.title}</p>
          <p class="product-price">
          <span class="product-new-price">$${item.price}</span>
            ${item.oldPrice ? `<span class="product-old-price">$${item.oldPrice}</span>` : ""}
            <button class="add-to-cart-btn" onclick="addItemToCart(${index})">Add to Cart</button>
          </p>
        </div>
      </div>
    `;
    recentlyBoughtSectionCardsContainer.innerHTML += cardHTML;
  });
}

function addItemToCart(index) {
  const item = shop_items_data[index];
  const existingItem = user_cart_data.find(cartItem => cartItem.title === item.title);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    user_cart_data.push({
      title: item.title,
      quantity: 1
    });
  }
  saveCart();
}

// Load user cart data from localStorage
function loadCart() {
  const storedCart = localStorage.getItem("user_cart_data");
  if (storedCart) {
    user_cart_data = JSON.parse(storedCart);
  }
}

// Save user cart data to localStorage
function saveCart() {
  localStorage.setItem("user_cart_data", JSON.stringify(user_cart_data));
}