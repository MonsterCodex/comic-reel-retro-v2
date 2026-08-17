const products=[
{id:1,type:"comic",category:"Marvel",name:"Comic Find #001",meta:"Marvel • Year TBC • Condition TBC",price:"£—"},
{id:2,type:"comic",category:"DC",name:"Comic Find #002",meta:"DC • Year TBC • Condition TBC",price:"£—"},
{id:3,type:"comic",category:"2000AD",name:"Comic Find #003",meta:"2000 AD • Year TBC • Condition TBC",price:"£—"},
{id:4,type:"comic",category:"British",name:"Comic Find #004",meta:"British Comics • Year TBC • Condition TBC",price:"£—"},
{id:5,type:"comic",category:"Independent",name:"Comic Find #005",meta:"Independent • Year TBC • Condition TBC",price:"£—"},
{id:6,type:"comic",category:"Manga",name:"Comic Find #006",meta:"Manga • Year TBC • Condition TBC",price:"£—"},
{id:7,type:"comic",category:"Other",name:"Comic Find #007",meta:"Other • Year TBC • Condition TBC",price:"£—"},
{id:101,type:"poster",category:"Movies",name:"Movie Poster #001",meta:"Movies • Licensed • Size TBC",price:"£—"},
{id:102,type:"poster",category:"TV",name:"TV Poster #002",meta:"TV • Licensed • Size TBC",price:"£—"},
{id:103,type:"poster",category:"Horror",name:"Horror Poster #003",meta:"Horror • Licensed • Size TBC",price:"£—"},
{id:104,type:"poster",category:"Gaming",name:"Gaming Poster #004",meta:"Gaming • Licensed • Size TBC",price:"£—"},
{id:105,type:"poster",category:"Superheroes",name:"Superhero Poster #005",meta:"Superheroes • Licensed • Size TBC",price:"£—"},
{id:106,type:"poster",category:"Sci-Fi",name:"Sci-Fi Poster #006",meta:"Sci-Fi • Licensed • Size TBC",price:"£—"},
{id:107,type:"poster",category:"Other",name:"Other Poster #007",meta:"Other • Licensed • Size TBC",price:"£—"}];
function card(p){const cls=p.type==="comic"?"comic-image":"poster-image",label=p.type==="comic"?"COMIC":"POSTER";return `<a class="product" data-category="${p.category}" href="product.html?id=${p.id}"><div class="product-image ${cls}">${label}<br>#${String(p.id).padStart(3,"0")}</div><div class="product-info"><h3>${p.name}</h3><p>${p.meta}</p><div class="price-row"><span class="price">${p.price}</span><span class="add">VIEW</span></div></div></a>`}
function render(type,filter="all"){const target=document.getElementById(type==="comic"?"comicProducts":"posterProducts");target.innerHTML=products.filter(p=>p.type===type&&(filter==="all"||p.category===filter)).map(card).join("")}
render("comic");render("poster");
document.querySelectorAll(".category-tabs").forEach(t=>t.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;t.querySelectorAll("button").forEach(x=>x.classList.remove("active"));b.classList.add("active");render(t.dataset.target==="comicProducts"?"comic":"poster",b.dataset.filter)}));
function renderNewArrivals(){
  const target=document.getElementById("newArrivalProducts");
  if(target) target.innerHTML='<div class="arrivals-empty">Your first arrivals will appear here when stock is ready.</div>';
}
function setupShopSearch(){
  const input=document.getElementById("siteSearch");
  const clear=document.getElementById("clearSearch");
  const status=document.getElementById("searchStatus");
  if(!input)return;
  const run=()=>{
    const q=input.value.trim().toLowerCase();
    let n=0;
    document.querySelectorAll(".product").forEach(card=>{
      const show=!q||card.textContent.toLowerCase().includes(q);
      card.hidden=!show;
      if(show)n++;
    });
    if(status)status.textContent=q?`${n} result${n===1?"":"s"} found`:"";
  };
  input.addEventListener("input",run);
  clear?.addEventListener("click",()=>{input.value="";run();input.focus();});
}
renderNewArrivals();
setupShopSearch();
