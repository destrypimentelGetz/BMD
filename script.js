const products = [
  {
    id: "pop-tee",
    name: "Confetti Pop Tee",
    price: 32,
    tag: "Best twirl",
    description: "Boxy cotton tee with candy-bright sleeve blocks.",
    artBg: "#ffe36e",
    garment: "#ff4fa3",
    button: "#93df55",
    shapeW: "46%",
    shapeH: "58%",
    shapeRadius: "28% 28% 12% 12%"
  },
  {
    id: "bounce-jacket",
    name: "Bounce Zip Jacket",
    price: 68,
    tag: "Layer hero",
    description: "Lightweight jacket with contrast panels and roomy pockets.",
    artBg: "#8df0eb",
    garment: "#5667ff",
    button: "#ffd447",
    shapeW: "58%",
    shapeH: "64%",
    shapeRadius: "18px 18px 12px 12px"
  },
  {
    id: "stripe-pants",
    name: "Sidewalk Stripe Pants",
    price: 54,
    tag: "Easy move",
    description: "Relaxed pull-on pants with a bright side stripe.",
    artBg: "#ffc4df",
    garment: "#171321",
    button: "#1cc7c1",
    shapeW: "34%",
    shapeH: "68%",
    shapeRadius: "18px 18px 28px 28px"
  },
  {
    id: "cloud-hoodie",
    name: "Cloud Pocket Hoodie",
    price: 62,
    tag: "Soft hit",
    description: "Plush hoodie with a curved pouch pocket and sunny drawcord.",
    artBg: "#c8ff9a",
    garment: "#ffffff",
    button: "#ff4fa3",
    shapeW: "56%",
    shapeH: "62%",
    shapeRadius: "34% 34% 16px 16px"
  },
  {
    id: "sunset-skirt",
    name: "Sunset Spin Skirt",
    price: 44,
    tag: "New color",
    description: "A-line skirt with bold panel seams and a comfy waist.",
    artBg: "#ffc969",
    garment: "#ff6f4f",
    button: "#93df55",
    shapeW: "62%",
    shapeH: "50%",
    shapeRadius: "18px 18px 46% 46%"
  },
  {
    id: "patch-sweater",
    name: "Patch Parade Sweater",
    price: 58,
    tag: "Cozy loud",
    description: "Soft knit pullover with mixed-color elbow patches.",
    artBg: "#d8d2ff",
    garment: "#1cc7c1",
    button: "#ffd447",
    shapeW: "60%",
    shapeH: "58%",
    shapeRadius: "26px 26px 14px 14px"
  },
  {
    id: "canvas-tote",
    name: "Snack Run Tote",
    price: 26,
    tag: "Add-on",
    description: "Sturdy canvas tote for spare layers and daily finds.",
    artBg: "#fff3b0",
    garment: "#f8f4e8",
    button: "#5667ff",
    shapeW: "50%",
    shapeH: "54%",
    shapeRadius: "14px 14px 22px 22px"
  },
  {
    id: "rainbow-cap",
    name: "Tilt Rainbow Cap",
    price: 28,
    tag: "Top it",
    description: "Curved-brim cap with a color-pop back strap.",
    artBg: "#aef8ff",
    garment: "#ffd447",
    button: "#ff4fa3",
    shapeW: "58%",
    shapeH: "34%",
    shapeRadius: "50% 50% 14px 14px"
  }
];

const state = {
  cart: new Map()
};

const productGrid = document.querySelector("#productGrid");
const cartPanel = document.querySelector("#cartPanel");
const cartItems = document.querySelector("#cartItems");
const cartEmpty = document.querySelector("#cartEmpty");
const cartCount = document.querySelector("#cartCount");
const openCartButton = document.querySelector("#openCart");
const closeCartButton = document.querySelector("#closeCart");
const cartCheckout = document.querySelector("#cartCheckout");
const checkoutForm = document.querySelector("#checkoutForm");
const checkoutMessage = document.querySelector("#checkoutMessage");
const confirmation = document.querySelector("#confirmation");
const closeConfirmationButton = document.querySelector("#closeConfirmation");
const confirmationSummary = document.querySelector("#confirmationSummary");
const scrim = document.querySelector("#scrim");
const siteHeader = document.querySelector(".site-header");
const pageMain = document.querySelector("main");

cartPanel.inert = true;

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

function formatMoney(value) {
  return money.format(value);
}

function getProduct(productId) {
  return products.find((product) => product.id === productId);
}

function getCartLines() {
  return Array.from(state.cart.entries()).map(([id, quantity]) => ({
    product: getProduct(id),
    quantity
  }));
}

function getShippingCost() {
  const selected = checkoutForm.querySelector("input[name='shipping']:checked");
  const baseCost = selected ? Number(selected.dataset.cost) : 0;
  const subtotal = getSubtotal();
  return subtotal >= 75 || subtotal === 0 ? 0 : baseCost;
}

function getSubtotal() {
  return getCartLines().reduce((sum, line) => sum + line.product.price * line.quantity, 0);
}

function getTotals() {
  const subtotal = getSubtotal();
  const tax = subtotal * 0.0825;
  const shipping = getShippingCost();
  return {
    subtotal,
    tax,
    shipping,
    total: subtotal + tax + shipping
  };
}

function setArtVars(element, product) {
  element.style.setProperty("--art-bg", product.artBg);
  element.style.setProperty("--garment", product.garment);
  element.style.setProperty("--button-bg", product.button);
  element.style.setProperty("--shape-w", product.shapeW);
  element.style.setProperty("--shape-h", product.shapeH);
  element.style.setProperty("--shape-radius", product.shapeRadius);
}

function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card" data-product-id="${product.id}">
          <div class="product-art" aria-hidden="true">
            <span class="product-badge">${product.tag}</span>
          </div>
          <div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
          </div>
          <div>
            <div class="price-row">
              <span>${formatMoney(product.price)}</span>
              <span>${product.id.includes("tote") || product.id.includes("cap") ? "Accessory" : "Clothing"}</span>
            </div>
            <button type="button" data-add="${product.id}">Add to bag</button>
          </div>
        </article>
      `
    )
    .join("");

  productGrid.querySelectorAll(".product-card").forEach((card) => {
    setArtVars(card, getProduct(card.dataset.productId));
  });
}

function renderCart() {
  const lines = getCartLines();
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const totals = getTotals();

  cartCount.textContent = itemCount;
  openCartButton.setAttribute("aria-label", `Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`);
  cartEmpty.classList.toggle("visible", lines.length === 0);
  cartCheckout.hidden = lines.length === 0;

  cartItems.innerHTML = lines
    .map(
      ({ product, quantity }) => `
        <article class="cart-item">
          <div class="mini-art" style="--art-bg: ${product.artBg}"></div>
          <div>
            <h3>${product.name}</h3>
            <p>${formatMoney(product.price * quantity)}</p>
            <div class="quantity-controls" aria-label="Quantity controls for ${product.name}">
              <button type="button" data-decrease="${product.id}" aria-label="Decrease ${product.name}">-</button>
              <span>${quantity}</span>
              <button type="button" data-increase="${product.id}" aria-label="Increase ${product.name}">+</button>
              <button type="button" data-remove="${product.id}" aria-label="Remove ${product.name}">Remove</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelector("#subtotal").textContent = formatMoney(totals.subtotal);
  document.querySelector("#tax").textContent = formatMoney(totals.tax);
  document.querySelector("#shipping").textContent = formatMoney(totals.shipping);
  document.querySelector("#total").textContent = formatMoney(totals.total);
}

function setPageInert(isInert) {
  siteHeader.inert = isInert;
  pageMain.inert = isInert;
}

function openCart() {
  cartPanel.classList.add("open");
  cartPanel.setAttribute("aria-hidden", "false");
  cartPanel.inert = false;
  openCartButton.setAttribute("aria-expanded", "true");
  setPageInert(true);
  scrim.hidden = false;
  closeCartButton.focus();
}

function closeCart({ restoreFocus = true } = {}) {
  cartPanel.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
  cartPanel.inert = true;
  openCartButton.setAttribute("aria-expanded", "false");
  setPageInert(false);
  scrim.hidden = true;
  if (restoreFocus) {
    openCartButton.focus();
  }
}

function addToCart(productId) {
  state.cart.set(productId, (state.cart.get(productId) || 0) + 1);
  renderCart();
  openCart();
}

function changeQuantity(productId, delta) {
  const nextQuantity = (state.cart.get(productId) || 0) + delta;
  if (nextQuantity <= 0) {
    state.cart.delete(productId);
  } else {
    state.cart.set(productId, nextQuantity);
  }
  renderCart();
}

function showMessage(message, type = "error") {
  checkoutMessage.textContent = message;
  checkoutMessage.dataset.type = type;
}

function validateCheckout() {
  let valid = true;
  checkoutForm.querySelectorAll("input[required]").forEach((input) => {
    const hasValue = input.value.trim().length > 0;
    const fieldValid = hasValue && input.checkValidity();
    input.classList.toggle("invalid", !fieldValid);
    valid = valid && fieldValid;
  });
  return valid;
}

function openConfirmation() {
  confirmation.hidden = false;
  setPageInert(true);
  closeConfirmationButton.focus();
}

function closeConfirmation() {
  confirmation.hidden = true;
  setPageInert(false);
  closeConfirmationButton.blur();
}

function submitCheckout(event) {
  event.preventDefault();

  if (state.cart.size === 0) {
    showMessage("Add something joyful to your bag before checkout.");
    openCart();
    return;
  }

  if (!validateCheckout()) {
    showMessage("Fill in the highlighted checkout details to keep the order rolling.");
    return;
  }

  const name = document.querySelector("#customerName").value.trim();
  const totals = getTotals();
  const count = getCartLines().reduce((sum, line) => sum + line.quantity, 0);

  confirmationSummary.textContent = `${name}, your demo order for ${count} item${
    count === 1 ? "" : "s"
  } totals ${formatMoney(totals.total)}. No payment was collected.`;
  closeCart({ restoreFocus: false });
  openConfirmation();
  state.cart.clear();
  checkoutForm.reset();
  checkoutForm.querySelectorAll(".invalid").forEach((field) => field.classList.remove("invalid"));
  showMessage("Order confirmed. Your cart is reset for another round.", "success");
  renderCart();
}

productGrid.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  if (addButton) {
    addToCart(addButton.dataset.add);
  }
});

cartItems.addEventListener("click", (event) => {
  const increase = event.target.closest("[data-increase]");
  const decrease = event.target.closest("[data-decrease]");
  const remove = event.target.closest("[data-remove]");

  if (increase) changeQuantity(increase.dataset.increase, 1);
  if (decrease) changeQuantity(decrease.dataset.decrease, -1);
  if (remove) {
    state.cart.delete(remove.dataset.remove);
    renderCart();
  }
});

openCartButton.addEventListener("click", openCart);
closeCartButton.addEventListener("click", () => closeCart());
cartCheckout.addEventListener("click", () => closeCart({ restoreFocus: false }));
closeConfirmationButton.addEventListener("click", closeConfirmation);
scrim.addEventListener("click", closeCart);
checkoutForm.addEventListener("submit", submitCheckout);
checkoutForm.addEventListener("change", renderCart);
checkoutForm.addEventListener("input", (event) => {
  if (event.target.matches("input[required]")) {
    const fieldValid = event.target.value.trim().length > 0 && event.target.checkValidity();
    event.target.classList.toggle("invalid", !fieldValid);
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!confirmation.hidden) {
    closeConfirmation();
  } else if (cartPanel.classList.contains("open")) {
    closeCart();
  }
});

renderProducts();
renderCart();
