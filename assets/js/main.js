const recentlyBoughtSectionCardsContainer = document.querySelector(".custom-card-group-container");
const shoppingCartOverviewContainer = document.querySelector("#shopping-cart-overview-container");
const shoppingCartOverviewBtn = document.querySelector("#shopping-cart-overview-btn");
const shoppingCartOverviewCounter = document.querySelector("#shopping-cart-overview-counter-ui");
const shoppingCartDataPlaceholder = document.querySelector("#shopping-cart-data-placeholder");

let user_cart_data = [];

document.addEventListener("DOMContentLoaded", function () {
  loadCartData();
  removeItemsWithZeroQuantity();
  renderRecentlyBoughtSectionCards();
  renderCartCounter();
});

function renderRecentlyBoughtSectionCards() {
  shop_items_data.forEach((item, index) => {
    const template = `
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
    recentlyBoughtSectionCardsContainer.innerHTML += template;
  });
}

function renderCartCounter() {
  let totalItems = user_cart_data.reduce((total, item) => total + item.quantity, 0);
  shoppingCartOverviewCounter.textContent = totalItems;
  totalItems > 0 ? show(shoppingCartOverviewCounter) : hide(shoppingCartOverviewCounter);
}

function renderShoppingCartOverview() {
  shoppingCartOverviewContainer.innerHTML = "";
  user_cart_data.forEach((item) => {
    const shopItem = shop_items_data.find(shopItem => shopItem.title === item.title);

    if (shopItem) {
      const template = `
        <div class="card rounded-0 mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${shopItem.imgSrc}" class="img-fluid" alt="${shopItem.title}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${shopItem.title}</h5>
                <p class="card-text"><small class="text-body-secondary">Quantity: ${item.quantity} | Total: $${(item.quantity * shopItem.price).toFixed(2)}</small></p>
              </div>
            </div>
          </div>
        </div>
      `;
      shoppingCartOverviewContainer.innerHTML += template;
    }
  });
  shoppingCartOverviewContainer.innerHTML += `<button id="shopping-cart-btn" onclick="renderShoppingCart(); openOverlay();";>Begin Checkout</button>`;
}

function renderShoppingCart() {
  shoppingCartDataPlaceholder.innerHTML = "";

  user_cart_data.forEach((item) => {
    const shopItem = shop_items_data.find(shopItem => shopItem.title === item.title);

    if (shopItem) {
      const template = `
        <div class="card rounded-0 mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${shopItem.imgSrc}" class="img-fluid" alt="${shopItem.title}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${shopItem.title}</h5>
                <p class="card-text"><small class="text-body-secondary">Quantity: <span class="item-quantity">${item.quantity}</span> | Total: $<span class="item-total">${(item.quantity * shopItem.price).toFixed(2)}</span></small></p>
                <button class="btn-decrease" data-title="${shopItem.title}"><i class="bi bi-dash"></i></button> 
                <button class="btn-increase" data-title="${shopItem.title}"><i class="bi bi-plus"></i></button>
              </div>
            </div>
          </div>
        </div>
      `;
      shoppingCartDataPlaceholder.innerHTML += template;
    }
  });

  const decreaseButtons = shoppingCartDataPlaceholder.querySelectorAll(".btn-decrease");
  const increaseButtons = shoppingCartDataPlaceholder.querySelectorAll(".btn-increase");

  decreaseButtons.forEach(button => {
    button.addEventListener("click", () => {
      const title = button.dataset.title;
      const item = user_cart_data.find(cartItem => cartItem.title === title);
      if (item && item.quantity > 0) {
        item.quantity -= 1;
        saveCartData();
        renderShoppingCart();
        renderCartCounter();
      }
    });
  });

  increaseButtons.forEach(button => {
    button.addEventListener("click", () => {
      const title = button.dataset.title;
      const item = user_cart_data.find(cartItem => cartItem.title === title);
      if (item) {
        item.quantity += 1;
        saveCartData();
        renderShoppingCart();
        renderCartCounter();
      }
    });
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
  saveCartData();
  renderCartCounter();
  renderShoppingCartOverview();
}

// Load user cart data from localStorage
function loadCartData() {
  const storedCart = localStorage.getItem("user_cart_data");
  if (storedCart) {
    user_cart_data = JSON.parse(storedCart);
  }
}

// Save user cart data to localStorage
function saveCartData() {
  localStorage.setItem("user_cart_data", JSON.stringify(user_cart_data));
}

// Removing Items when Zero Quantity
function removeItemsWithZeroQuantity() {
  user_cart_data = user_cart_data.filter(item => item.quantity > 0);
  saveCartData();
}
