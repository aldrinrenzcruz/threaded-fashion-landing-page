const shoppingCartContainer = document.querySelector("#shopping-cart-container");
const shoppingCartBtn = document.querySelector("#shopping-cart-btn");

const shop_items_data = [
  {
    imgSrc: "assets/imgs/recently-bought-festive-looks-rust.png",
    title: "Festive Looks Rust Red Ribbed Velvet Long Sleeve Bodysuit",
    price: 38,
    oldPrice: null
  },
  {
    imgSrc: "assets/imgs/recently-bought-chevron-flap.png",
    title: "Chevron Flap Crossbody Bag",
    price: 5.77,
    oldPrice: 7.34
  },
  {
    imgSrc: "assets/imgs/recently-bought-manilla-tan.png",
    title: "Manilla Tan Multi Plaid Oversized Fringe Scarf",
    price: 29,
    oldPrice: 39
  },
  {
    imgSrc: "assets/imgs/recently-bought-diamante-puff.png",
    title: "Diamante Puff Sleeve Dress - Black",
    price: 45.99,
    oldPrice: null
  },
  {
    imgSrc: "assets/imgs/recently-bought-banneth-open.png",
    title: "Banneth Open Front Formal Dress In Black",
    price: 69,
    oldPrice: 99.95
  }
];

function renderRecentlyBoughtSectionCards() {
  const container = document.querySelector(".custom-card-group-container");
  container.innerHTML = "";

  shop_items_data.forEach((item, index) => {
    const cardHTML = `
      <div class="custom-card">
        <img src="${item.imgSrc}" alt="Product Image">
        <div class="custom-card-body">
          <p class="product-title">${item.title}</p>
          <p class="product-price">
          <span class="product-new-price">$${item.price}</span>
            ${item.oldPrice ? `<span class="product-old-price">$${item.oldPrice}</span>` : ""}
            <button class="add-to-cart-btn" onclick="addToCart(${index})">Add to Cart</button>
          </p>
        </div>
      </div>
    `;
    container.innerHTML += cardHTML;
  });
}

function addToCart(index) {
  const item = shop_items_data[index];
  console.log(`Added to cart: ${item.title}`);
}

renderRecentlyBoughtSectionCards();

shoppingCartBtn.addEventListener("click", () => { toggle(shoppingCartContainer) })

// TODO:
// 1. Add an event listener to close the shopping cart container when clicking outside of it (And when not clicking the cart btn)
// 2. Add Esc event listener to close the shopping cart container

function getElement(param) {
  return typeof param === "string" ? document.querySelector(`#${param}`) : param;
}

function show(param, display_style) {
  const element = getElement(param);
  const display = display_style || "block";
  if (element) {
    element.style.opacity = 0;
    element.style.display = display;
    requestAnimationFrame(function () {
      element.style.transition = "opacity 200ms";
      element.style.opacity = 1;
    });
  } else {
    console.warn("Element being shown not found or invalid parameter.");
  }
}

function hide(param) {
  const element = getElement(param);
  if (element) {
    element.style.opacity = 0;
    requestAnimationFrame(function () {
      element.style.transition = "opacity 200ms";
      element.style.display = "none";
    });
  } else {
    console.warn("Element being hidden not found or invalid parameter.");
  }
}

function toggle(param, display_style) {
  const element = getElement(param);
  const display = display_style || "block";
  if (element) {
    if (window.getComputedStyle(element).display === "none") {
      show(param, display);
    } else {
      hide(param);
    }
  } else {
    console.warn("Element being toggled not found or invalid parameter.");
  }
}