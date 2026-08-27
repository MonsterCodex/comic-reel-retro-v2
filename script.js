const products = [
  {id:1,type:"comic",category:"Marvel",name:"Marvel Retro Classic #001",meta:"Marvel / 1980s / Very Good",price:9.99},
  {id:2,type:"comic",category:"DC",name:"Comic Find #002",meta:"DC / Year TBC / Condition TBC",price:12.99},
  {id:3,type:"comic",category:"2000AD",name:"Comic Find #003",meta:"2000 AD / Year TBC / Condition TBC",price:7.99},
  {id:4,type:"comic",category:"British",name:"Comic Find #004",meta:"British Comics / Year TBC / Condition TBC",price:9.99},
  {id:5,type:"comic",category:"Indie",name:"Comic Find #005",meta:"Indie / Year TBC / Condition TBC",price:7.99},
  {id:6,type:"comic",category:"Manga",name:"Comic Find #006",meta:"Manga / Year TBC / Condition TBC",price:8.99},
  {id:7,type:"comic",category:"Other",name:"Comic Find #007",meta:"Other / Year TBC / Condition TBC",price:6.99},
  {id:101,type:"poster",category:"Movies",name:"Movie Poster #001",meta:"Movies / Licensed / Size TBC",price:12.99},
  {id:102,type:"poster",category:"TV",name:"TV Poster #002",meta:"TV / Licensed / Size TBC",price:12.99},
  {id:103,type:"poster",category:"Horror",name:"Horror Poster #003",meta:"Horror / Licensed / Size TBC",price:14.99},
  {id:104,type:"poster",category:"Gaming",name:"Gaming Poster #004",meta:"Gaming / Licensed / Size TBC",price:12.99},
  {id:105,type:"poster",category:"Superheroes",name:"Superhero Poster #005",meta:"Superheroes / Licensed / Size TBC",price:14.99},
  {id:106,type:"poster",category:"Sci-Fi",name:"Sci-Fi Poster #006",meta:"Sci-Fi / Licensed / Size TBC",price:12.99},
  {id:107,type:"poster",category:"Other",name:"Other Poster #007",meta:"Other / Licensed / Size TBC",price:9.99}
];

let cart = JSON.parse(localStorage.getItem("crrCart") || "[]");

function card(p) {
  const label = p.type === "comic" ? "COMIC" : "POSTER";
  const cls = p.type === "comic" ? "comic-image" : "poster-image";

  const image = p.id === 1
    ? `<img src="images/wolf-comic.png" alt="${p.name}">`
    : `${label}<br>#${String(p.id).padStart(3, "0")}`;

  return `
    <article class="product">
      <a class="product-link" href="product.html?id=${p.id}" aria-label="View ${p.name}">
        <div class="product-image ${cls}">
          ${image}
        </div>

        <div class="product-info">
          <h3>${p.name}</h3>
          <p>${p.meta}</p>

          <div class="price-row">
            <span class="price">£${p.price.toFixed(2)}</span>
            <span class="add">VIEW</span>
          </div>
        </div>
      </a>

      <button class="quick-add" onclick="addToCart(${p.id})">
        ADD TO BAG
      </button>
    </article>
  `;
}

function renderProducts(type, category = "all") {
  const target = document.getElementById(
    type === "comic" ? "comicProducts" : "posterProducts"
  );

  if (!target) return;

  target.innerHTML = products
    .filter(p => p.type === type && (category === "all" || p.category === category))
    .map(card)
    .join("");
}

function scrollToResults(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const top =
    target.getBoundingClientRect().top + window.scrollY -170;

  window.scrollTo({
    top,
    behavior: "smooth"
  });
}

function setupCategoryTabs() {
  document.querySelectorAll(".category-tabs").forEach(tabs => {
    tabs.addEventListener("click", event => {
      const button = event.target.closest("button[data-filter]");
      if (!button) return;

      tabs.querySelectorAll("button").forEach(b =>
        b.classList.remove("active")
      );

      button.classList.add("active");

      const targetId = tabs.dataset.target;
      const type = targetId === "comicProducts" ? "comic" : "poster";

      renderProducts(type, button.dataset.filter);

      requestAnimationFrame(() => scrollToResults(targetId));
    });
  });
}

function renderNewArrivals() {
  const target = document.getElementById("newArrivalProducts");

  if (target) {
    target.innerHTML =
      '<div class="arrivals-empty">Your first arrivals will appear here when stock is ready.</div>';
  }
}

function setupSearch() {
  const input = document.getElementById("siteSearch");
  const clear = document.getElementById("clearSearch");
  const status = document.getElementById("searchStatus");

  if (!input) return;

  const run = () => {
    const query = input.value.trim().toLowerCase();
    let matches = 0;

    document.querySelectorAll(".product").forEach(product => {
      const show =
        !query ||
        product.textContent.toLowerCase().includes(query);

      product.hidden = !show;

      if (show) matches++;
    });

    if (status) {
      status.textContent = query
        ? `${matches} result${matches === 1 ? "" : "s"} found`
        : "";
    }

    if (clear) clear.hidden = !query;
  };

  input.addEventListener("input", run);

  clear?.addEventListener("click", () => {
    input.value = "";
    run();
    input.focus();
  });
}

function saveCart() {
  localStorage.setItem("crrCart", JSON.stringify(cart));
  renderCart();
}

function addToCart(id) {
  const product = products.find(item => item.id === id);

  if (!product) return;

  cart.push(product);
  saveCart();

  document.getElementById("cartPanel")?.classList.add("open");
  document.getElementById("overlay")?.classList.add("open");
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
}

function renderCart() {
  const count = document.getElementById("cartCount");
  const items = document.getElementById("cartItems");
  const total = document.getElementById("cartTotal");

  if (!count || !items || !total) return;

  count.textContent = cart.length;

  items.innerHTML = cart.length
    ? cart.map((p, index) => `
        <div class="cart-item">
          <div>
            <h4>${p.name}</h4>
            <small>£${p.price.toFixed(2)}</small>
          </div>
          <button onclick="removeItem(${index})">Remove</button>
        </div>
      `).join("")
    : '<div class="empty">Your bag is empty.</div>';

  total.textContent =
    "£" +
    cart.reduce((sum, p) => sum + p.price, 0).toFixed(2);
}

// PAGE SETUP

if (document.getElementById("comicProducts")) {
  renderProducts("comic");
}

if (document.getElementById("posterProducts")) {
  renderProducts("poster");
}

if (document.getElementById("newArrivalProducts")) {
  renderNewArrivals();
}

setupCategoryTabs();
setupSearch();
renderCart();

document.getElementById("cartButton")?.addEventListener("click", () => {
  document.getElementById("cartPanel")?.classList.add("open");
  document.getElementById("overlay")?.classList.add("open");
});

document.getElementById("closeCart")?.addEventListener("click", () => {
  document.getElementById("cartPanel")?.classList.remove("open");
  document.getElementById("overlay")?.classList.remove("open");
});

document.getElementById("overlay")?.addEventListener("click", () => {
  document.getElementById("cartPanel")?.classList.remove("open");
  document.getElementById("overlay")?.classList.remove("open");
});

document.getElementById("checkout")?.addEventListener("click", () => {
  alert("Checkout will be connected after the payment platform is chosen.");
});
