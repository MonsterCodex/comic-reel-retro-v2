const products = {
  "1": {
    type: "comic",
    category: "Marvel",
    name: "Comic Find #001",
    meta: "Marvel · Year TBC · Issue TBC",
    price: 9.99,
    condition: "Condition TBC",
    description: "Placeholder listing for development. Replace this information with the real item when stock arrives."
  },
  "2": {
    type: "comic",
    category: "DC",
    name: "Comic Find #002",
    meta: "DC · Year TBC · Issue TBC",
    price: 12.99,
    condition: "Condition TBC",
    description: "Placeholder listing for development. Replace this information with the real item when stock arrives."
  },
  "101": {
    type: "poster",
    category: "Movies",
    name: "Movie Poster #001",
    meta: "Movies · Licensed · Size TBC",
    price: 12.99,
    condition: "New",
    description: "Placeholder listing for development. Replace this information with the real poster when stock arrives."
  }
};

let cart = JSON.parse(localStorage.getItem("crrCart") || "[]");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const product = products[id] || products["1"];

document.title = `${product.name} | Comic Reel & Retro`;

document.getElementById("productCategory").textContent = product.category;
document.getElementById("productName").textContent = product.name;
document.getElementById("productMeta").textContent = product.meta;
document.getElementById("productPrice").textContent = `£${product.price.toFixed(2)}`;
document.getElementById("productCondition").textContent = product.condition;
document.getElementById("productDescription").textContent = product.description;

const image = document.getElementById("productImage");
image.innerHTML = product.type === "comic" ? "COMIC<br>PHOTO" : "POSTER<br>PHOTO";

document.getElementById("backLink").href =
  product.type === "comic" ? "index.html#comics" : "index.html#posters";

function renderCart() {
  const count = document.getElementById("cartCount");
  const items = document.getElementById("cartItems");
  const total = document.getElementById("cartTotal");

  count.textContent = cart.length;

  items.innerHTML = cart.length
    ? cart.map((p, i) => `
        <div class="cart-item">
          <div>
            <h4>${p.name}</h4>
            <small>£${p.price.toFixed(2)}</small>
          </div>
          <button onclick="removeItem(${i})">Remove</button>
        </div>
      `).join("")
    : '<div class="empty">Your bag is empty.</div>';

  total.textContent = "£" + cart.reduce((sum, p) => sum + p.price, 0).toFixed(2);
}

function saveCart() {
  localStorage.setItem("crrCart", JSON.stringify(cart));
  renderCart();
}

function openCart() {
  document.getElementById("cartPanel").classList.add("open");
  document.getElementById("overlay").classList.add("open");
}

function closeCart() {
  document.getElementById("cartPanel").classList.remove("open");
  document.getElementById("overlay").classList.remove("open");
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
}

document.getElementById("addProduct").addEventListener("click", () => {
  cart.push(product);
  saveCart();
  openCart();
});

document.getElementById("cartButton").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
document.getElementById("overlay").addEventListener("click", closeCart);

document.getElementById("checkout").addEventListener("click", () => {
  alert("Checkout will be connected after the payment platform is chosen.");
});

renderCart();
