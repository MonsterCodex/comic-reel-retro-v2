const products = [
  {
    id:1,
    type:"comic",
    category:"Marvel",
    name:"The Amazing Spider-Man #61",
    meta:"Marvel / 2021 / Issue #61",
    price:4.00,
    image:"images/amazing-spider-man-61.jpg",
    issue:"#61",
    year:"2021",
    publisher:"Marvel",
    creators:"Nick Spencer • Patrick Gleason • Edgar Delgado",
    condition:"Very Good",
    description:"The Amazing Spider-Man #61 from 2021. Peter Parker gets a new job and Spider-Man gets a new look as Kingpin's plans begin to come together.",story:"This issue kicks off the King's Ransom storyline. The return of the Lifeline Tablet draws Kingpin into a dangerous plan, while Peter adopts a new Spider-Man suit and the wider conflict begins to build.",additional:"Written by Nick Spencer, with art by Patrick Gleason and colours by Edgar Delgado. Marvel lists the issue as published March 10, 2021."
  },
  {
    id:2,
    type:"comic",
    category:"Marvel",
    name:"The Amazing Spider-Man #84",
    meta:"Marvel / 2022 / Issue #84",
    price:1.50,
    image:"images/amazing-spider-man-84.jpg",
    issue:"#84",
    year:"2022",
    publisher:"Marvel",
    creators:"Cody Ziglar • Paco Medina • Arthur Adams",
    condition:"Very Good",
    description:"The Amazing Spider-Man #84 from 2022, part of the Beyond storyline. Doctor Octopus is on a collision course with the Beyond Corporation and its Spider-Hero, Ben Reilly.",story:"The issue follows the growing conflict between Doctor Octopus and Beyond, with Ben Reilly caught up in the confrontation. It forms part of the Beyond era in which Ben Reilly is operating as Spider-Man.",additional:"Written by Cody Ziglar, pencilled by Paco Medina, with cover art by Arthur Adams. Marvel lists the issue as published January 5, 2022."
  },
  {id:3,type:"comic",category:"2000AD",name:"Comic Find #003",meta:"2000 AD / Year TBC / Issue TBC",price:7.99},
  {id:4,type:"comic",category:"British",name:"Comic Find #004",meta:"British Comics / Year TBC / Issue TBC",price:9.99},
  {id:5,type:"comic",category:"Indie",name:"Comic Find #005",meta:"Independent / Year TBC / Issue TBC",price:7.99},
  {id:6,type:"comic",category:"Manga",name:"Comic Find #006",meta:"Manga / Year TBC / Issue TBC",price:8.99},
  {id:7,type:"comic",category:"Other",name:"Comic Find #007",meta:"Other / Year TBC / Issue TBC",price:6.99},
  {id:101,type:"poster",category:"Movies",name:"Movie Poster #001",meta:"Movies / Licensed / Size TBC",price:12.99},
  {id:102,type:"poster",category:"TV",name:"TV Poster #002",meta:"TV / Licensed / Size TBC",price:12.99},
  {id:103,type:"poster",category:"Horror",name:"Horror Poster #003",meta:"Horror / Licensed / Size TBC",price:14.99},
  {id:104,type:"poster",category:"Gaming",name:"Gaming Poster #004",meta:"Gaming / Licensed / Size TBC",price:12.99},
  {id:105,type:"poster",category:"Superheroes",name:"Superhero Poster #005",meta:"Superheroes / Licensed / Size TBC",price:14.99},
  {id:106,type:"poster",category:"Sci-Fi",name:"Sci-Fi Poster #006",meta:"Sci-Fi / Licensed / Size TBC",price:14.99},
  {id:107,type:"poster",category:"Other",name:"Other Poster #007",meta:"Other / Licensed / Size TBC",price:9.99}
];

let cart = JSON.parse(localStorage.getItem("crrCart") || "[]");

function card(p) {
  const label = p.type === "comic" ? "COMIC" : "POSTER";
  const cls = p.type === "comic" ? "comic-image" : "poster-image";

  const image = p.image
    ? `<img src="${p.image}" alt="${p.name}">`
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


function renderProductPage() {
  const target = document.getElementById("productPage");
  if (!target) return;

  const id = Number(new URLSearchParams(window.location.search).get("id"));
  const product = products.find(item => item.id === id);

  if (!product) {
    target.innerHTML = `
      <div class="product-not-found">
        <h1>Product not found</h1>
        <p>Sorry, we couldn't find that item.</p>
        <a href="comics.html">Back to Comics</a>
      </div>
    `;
    return;
  }

  const image = product.image
    ? `<img src="${product.image}" alt="${product.name}">`
    : `<div class="product-photo-placeholder">COMIC<br>PHOTO</div>`;

  target.innerHTML = `
    <div class="product-detail">
      <div class="product-detail-image">
        ${image}
      </div>

      <div class="product-detail-info">
        <p class="eyebrow">${product.category}</p>
        <h1>${product.name}</h1>
        <p class="product-detail-meta">${product.publisher || product.category} · ${product.year || "Year TBC"} · Issue ${product.issue || "TBC"}</p>

        <div class="product-detail-price">£${product.price.toFixed(2)}</div>

        <button class="product-detail-button" onclick="addToCart(${product.id})">
          ADD TO BAG
        </button>

        <div class="detail-section">
          <h2>DETAILS</h2>
          <p><strong>Publisher:</strong> ${product.publisher || "TBC"}</p>
          <p><strong>Year:</strong> ${product.year || "TBC"}</p>
          <p><strong>Issue:</strong> ${product.issue || "TBC"}</p>
          <p><strong>Creators:</strong> ${product.creators || "TBC"}</p>
        </div>

        <div class="detail-section">
          <h2>CONDITION</h2>
          <p>${product.condition || (product.type === "comic" ? "Very Good" : "Condition to be confirmed. Please see the photographs.")}</p>
        </div>

        <div class="detail-section">
          <h2>DESCRIPTION</h2>
          <p>${product.description || "Please see the photographs for the actual item."}</p>
        </div>

        ${product.story ? `<div class="detail-section">
          <h2>STORY / OVERVIEW</h2>
          <p>${product.story}</p>
        </div>` : ""}

        ${product.additional ? `<div class="detail-section">
          <h2>ADDITIONAL INFO</h2>
          <p>${product.additional}</p>
        </div>` : ""}

        <div class="detail-section">
          <h2>DELIVERY</h2>
          <p>UK delivery information will be shown here once delivery rates are finalised.</p>
        </div>
      </div>
    </div>
  `;
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

if (document.getElementById("productPage")) {
  renderProductPage();
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
