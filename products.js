const WA_NUMBER = "62895419050123";

let currentCategory = "All";

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");

function renderProducts() {

const keyword = searchInput.value.toLowerCase();

productGrid.innerHTML = "";

products
.filter(product => {

const matchCategory =
currentCategory === "All" ||
product.category === currentCategory;

const matchSearch =
product.name.toLowerCase().includes(keyword);

return matchCategory && matchSearch;

})

.forEach(product => {

const card = document.createElement("div");
card.className = "product-card";

const priceHTML = product.prices
.map(price =>
`<div class="price-item">${price}</div>`
)
.join("");

card.innerHTML = `

<div class="product-title">
${product.name}
</div>

<button class="view-btn">
Lihat Harga
</button>

<div class="price-list">

${priceHTML}

<button class="order-btn">
Pesan via WhatsApp
</button>

</div>

`;

const viewBtn =
card.querySelector(".view-btn");

const priceList =
card.querySelector(".price-list");

viewBtn.addEventListener("click", () => {

priceList.classList.toggle("active");

viewBtn.textContent =
priceList.classList.contains("active")
? "Tutup"
: "Lihat Harga";

});

const orderBtn =
card.querySelector(".order-btn");

orderBtn.addEventListener("click", () => {

const message = encodeURIComponent(

`Halo Cueku Store,

Saya ingin membeli:

${product.name}

Mohon diproses.`

);

window.open(
`https://wa.me/${WA_NUMBER}?text=${message}`,
"_blank"
);

});

productGrid.appendChild(card);

});

}

document
.querySelectorAll(".category")
.forEach(btn => {

btn.addEventListener("click", () => {

document
.querySelectorAll(".category")
.forEach(el =>
el.classList.remove("active")
);

btn.classList.add("active");

currentCategory =
btn.dataset.category;

renderProducts();

});

});

searchInput.addEventListener(
"input",
renderProducts
);

const scrollTopBtn =
document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

if(window.scrollY > 500){

scrollTopBtn.style.display = "block";

}else{

scrollTopBtn.style.display = "none";

}

});

scrollTopBtn.addEventListener(
"click",
() => {

window.scrollTo({
top:0,
behavior:"smooth"
});

}
);

window.addEventListener("load", () => {

setTimeout(() => {

document.getElementById("loader").style.opacity = "0";

setTimeout(() => {

document.getElementById("loader").style.display = "none";

},800);

},5000);

});

renderProducts();
