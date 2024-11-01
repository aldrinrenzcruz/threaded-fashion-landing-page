// TODO:
// 1. Add an event listener to close the shopping cart container when clicking outside of it (And when not clicking the cart btn)
// 2. Add Esc event listener to close the shopping cart container

shoppingCartBtn.addEventListener("click", () => { toggle(shoppingCartContainer) })

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