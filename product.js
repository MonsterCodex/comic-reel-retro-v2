const products = {
  "1": {type:"comic",category:"Marvel",name:"Comic Find #001",meta:"Marvel · Year TBC · Issue TBC",price:9.99,condition:"Condition TBC",description:"Placeholder listing for development. Replace with the real item details when stock arrives."},
  "2": {type:"comic",category:"DC",name:"Comic Find #002",meta:"DC · Year TBC · Issue TBC",price:12.99,condition:"Condition TBC",description:"Placeholder listing for development. Replace with the real item details when stock arrives."},
  "3": {type:"comic",category:"2000 AD",name:"Comic Find #003",meta:"2000 AD · Year TBC · Issue TBC",price:7.99,condition:"Condition TBC",description:"Placeholder listing for development. Replace with the real item details when stock arrives."},
  "4": {type:"comic",category:"British",name:"Comic Find #004",meta:"British Comics · Year TBC · Issue TBC",price:9.99,condition:"Condition TBC",description:"Placeholder listing for development. Replace with the real item details when stock arrives."},
  "5": {type:"comic",category:"Independent",name:"Comic Find #005",meta:"Independent · Year TBC · Issue TBC",price:7.99,condition:"Condition TBC",description:"Placeholder listing for development. Replace with the real item details when stock arrives."},
  "6": {type:"comic",category:"Manga",name:"Comic Find #006",meta:"Manga · Year TBC · Issue TBC",price:8.99,condition:"Condition TBC",description:"Placeholder listing for development. Replace with the real item details when stock arrives."},
  "7": {type:"comic",category:"Other",name:"Comic Find #007",meta:"Other · Year TBC · Issue TBC",price:6.99,condition:"Condition TBC",description:"Placeholder listing for development. Replace with the real item details when stock arrives."},
  "101": {type:"poster",category:"Movies",name:"Movie Poster #001",meta:"Movies · Licensed · Size TBC",price:12.99,condition:"New",description:"Placeholder listing for development. Replace with the real poster details when stock arrives."},
  "102": {type:"poster",category:"TV",name:"TV Poster #002",meta:"TV · Licensed · Size TBC",price:12.99,condition:"New",description:"Placeholder listing for development. Replace with the real poster details when stock arrives."},
  "103": {type:"poster",category:"Horror",name:"Horror Poster #003",meta:"Horror · Licensed · Size TBC",price:14.99,condition:"New",description:"Placeholder listing for development. Replace with the real poster details when stock arrives."},
  "104": {type:"poster",category:"Gaming",name:"Gaming Poster #004",meta:"Gaming · Licensed · Size TBC",price:12.99,condition:"New",description:"Placeholder listing for development. Replace with the real poster details when stock arrives."},
  "105": {type:"poster",category:"Superheroes",name:"Superhero Poster #005",meta:"Superheroes · Licensed · Size TBC",price:14.99,condition:"New",description:"Placeholder listing for development. Replace with the real poster details when stock arrives."},
  "106": {type:"poster",category:"Sci-Fi",name:"Sci-Fi Poster #006",meta:"Sci-Fi · Licensed · Size TBC",price:12.99,condition:"New",description:"Placeholder listing for development. Replace with the real poster details when stock arrives."},
  "107": {type:"poster",category:"Other",name:"Other Poster #007",meta:"Other · Licensed · Size TBC",price:9.99,condition:"New",description:"Placeholder listing for development. Replace with the real poster details when stock arrives."}
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

document.getElementById("productImage").innerHTML =
  product.type === "comic" ? "COMIC<br>PHOTO" : "POSTER<br>PHOTO";

document.getElementById("backLink").href =
  product.type === "comic"
    ? "index.html#comics"
    : "index.html#posters";

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

  total.textContent =
    "£" + cart.reduce((sum, p) => sum + p.price, 0).toFixed(2);
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
