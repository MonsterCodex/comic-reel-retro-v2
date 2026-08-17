const products = [
  {id:1,type:"comic",name:"Comic Find #001",meta:"Marvel / Modern / Condition TBC",price:9.99},
  {id:2,type:"comic",name:"Comic Find #002",meta:"DC / Vintage / Condition TBC",price:12.99},
  {id:3,type:"comic",name:"Comic Find #003",meta:"Independent / Modern / Condition TBC",price:7.99},
  {id:4,type:"comic",name:"Comic Find #004",meta:"Collector Issue / Condition TBC",price:19.99},
  {id:5,type:"poster",name:"Movie Poster #001",meta:"Licensed / Size TBC",price:12.99},
  {id:6,type:"poster",name:"Movie Poster #002",meta:"Licensed / Size TBC",price:14.99},
  {id:7,type:"poster",name:"Retro Poster #001",meta:"Pop Culture / Size TBC",price:11.99},
  {id:8,type:"poster",name:"Horror Poster #001",meta:"Licensed / Size TBC",price:14.99}
];

let cart = JSON.parse(localStorage.getItem("crrCart") || "[]");

function card(p){
  const label = p.type === "comic" ? "COMIC" : "POSTER";
  const cls = p.type === "comic" ? "comic-image" : "poster-image";
  return `<article class="product">
    <div class="product-image ${cls}">${label}<br>#${String(p.id).padStart(3,"0")}</div>
    <div class="product-info">
      <h3>${p.name}</h3><p>${p.meta}</p>
      <div class="price-row"><span class="price">£${p.price.toFixed(2)}</span><button class="add" onclick="addToCart(${p.id})">ADD</button></div>
    </div>
  </article>`;
}
document.getElementById("comicProducts").innerHTML = products.filter(p=>p.type==="comic").map(card).join("");
document.getElementById("posterProducts").innerHTML = products.filter(p=>p.type==="poster").map(card).join("");

function save(){localStorage.setItem("crrCart",JSON.stringify(cart));renderCart();}
function addToCart(id){const p=products.find(x=>x.id===id);cart.push(p);save();openCart();}
function removeFromCart(index){cart.splice(index,1);save();}
function renderCart(){
  document.getElementById("cartCount").textContent=cart.length;
  const items=document.getElementById("cartItems");
  if(!cart.length){items.innerHTML='<div class="empty">Your bag is empty.</div>';}
  else items.innerHTML=cart.map((p,i)=>`<div class="cart-item"><div><h4>${p.name}</h4><small>£${p.price.toFixed(2)}</small></div><button onclick="removeFromCart(${i})">Remove</button></div>`).join("");
  document.getElementById("cartTotal").textContent="£"+cart.reduce((s,p)=>s+p.price,0).toFixed(2);
}
function openCart(){document.getElementById("cartPanel").classList.add("open");document.getElementById("overlay").classList.add("open");}
function closeCart(){document.getElementById("cartPanel").classList.remove("open");document.getElementById("overlay").classList.remove("open");}
document.getElementById("cartButton").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
document.getElementById("overlay").onclick=closeCart;
document.getElementById("checkout").onclick=()=>alert("Checkout will be connected after we choose the selling/payment platform.");
renderCart();
