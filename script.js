const products = [
  {id:1,type:"comic",category:"Marvel",name:"Comic Find #001",meta:"Marvel / Year TBC / Condition TBC",price:9.99},
  {id:2,type:"comic",category:"DC",name:"Comic Find #002",meta:"DC / Year TBC / Condition TBC",price:12.99},
  {id:3,type:"comic",category:"2000AD",name:"Comic Find #003",meta:"2000 AD / Year TBC / Condition TBC",price:7.99},
  {id:4,type:"comic",category:"British",name:"Comic Find #004",meta:"British Comics / Year TBC / Condition TBC",price:9.99},
  {id:5,type:"comic",category:"Independent",name:"Comic Find #005",meta:"Independent / Year TBC / Condition TBC",price:7.99},
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

function card(p){
  const label = p.type === "comic" ? "COMIC" : "POSTER";
  const cls = p.type === "comic" ? "comic-image" : "poster-image";
  return `<article class="product">
    <div class="product-image ${cls}">${label}<br>#${String(p.id).padStart(3,"0")}</div>
    <div class="product-info">
      <h3>${p.name}</h3><p>${p.meta}</p>
      <div class="price-row">
        <span class="price">£${p.price.toFixed(2)}</span>
        <button class="add" onclick="addToCart(${p.id})">ADD</button>
      </div>
    </div>
  </article>`;
}

function renderProducts(type, category="all"){
  const targetId = type === "comic" ? "comicProducts" : "posterProducts";
  const target = document.getElementById(targetId);
  if(!target) return;

  const filtered = products.filter(p =>
    p.type === type && (category === "all" || p.category === category)
  );

  target.innerHTML = filtered.map(card).join("");
}

function setupCategoryTabs(){
  document.querySelectorAll(".category-tabs").forEach(tabs => {
    tabs.addEventListener("click", event => {
      const button = event.target.closest("button[data-filter]");
      if(!button) return;

      tabs.querySelectorAll("button").forEach(b => b.classList.remove("active"));
      button.classList.add("active");

      const type = tabs.dataset.target === "comicProducts" ? "comic" : "poster";
      renderProducts(type, button.dataset.filter);
    });
  });
}

function save(){
  localStorage.setItem("crrCart", JSON.stringify(cart));
  renderCart();
}

function addToCart(id){
  const p = products.find(x => x.id === id);
  if(!p) return;
  cart.push(p);
  save();
  openCart();
}

function removeFromCart(index){
  cart.splice(index,1);
  save();
}

function renderCart(){
  const count = document.getElementById("cartCount");
  const items = document.getElementById("cartItems");
  const total = document.getElementById("cartTotal");
  if(!count || !items || !total) return;

  count.textContent = cart.length;

  if(!cart.length){
    items.innerHTML = '<div class="empty">Your bag is empty.</div>';
  } else {
    items.innerHTML = cart.map((p,i) =>
      `<div class="cart-item"><div><h4>${p.name}</h4><small>£${p.price.toFixed(2)}</small></div><button onclick="removeFromCart(${i})">Remove</button></div>`
    ).join("");
  }

  total.textContent = "£" + cart.reduce((sum,p) => sum + p.price,0).toFixed(2);
}

function openCart(){
  document.getElementById("cartPanel")?.classList.add("open");
  document.getElementById("overlay")?.classList.add("open");
}

function closeCart(){
  document.getElementById("cartPanel")?.classList.remove("open");
  document.getElementById("overlay")?.classList.remove("open");
}

renderProducts("comic");
renderProducts("poster");
setupCategoryTabs();
renderCart();

document.getElementById("cartButton")?.addEventListener("click", openCart);
document.getElementById("closeCart")?.addEventListener("click", closeCart);
document.getElementById("overlay")?.addEventListener("click", closeCart);
document.getElementById("checkout")?.addEventListener("click", () =>
  alert("Checkout will be connected after we choose the selling/payment platform.")
);
