const products = [
  { id: 1, name: "T-Shirt", price: 19.99, image: "https://th.bing.com/th/id/OIF.07ZVSQfEgiqHFKEaM9zNpQ?w=157&h=180&c=7&r=0&o=7&cb=iwp2&pid=1.7&rm=3", description: "A comfortable cotton T-shirt.", category: "clothing" },
  { id: 2, name: "Trousers", price: 23.99, image: "https://th.bing.com/th/id/OIP.UMGpzIQ9EZ5TUL_YwyCpBAHaRf?w=148&h=350&c=7&r=0&o=5&cb=iwc2&pid=1.7", description: "A classy Trouser.", category: "clothing" },
  { id: 3, name: "Hoodie", price: 34.99, image: "https://th.bing.com/th/id/OIP.ySZqMNmYDhN5pNXNrNd2FQHaJ3?w=190&h=253&c=7&r=0&o=5&cb=iwc2&pid=1.7", description: "stay cozy and stylish.", category: "clothing" },
  { id: 4, name: "Blazer and Skirt", price: 19.99, image: "https://th.bing.com/th/id/OIP.6BUtLry5a1roC682htc0DQAAAA?w=175&h=350&c=7&r=0&o=5&cb=iwc2&pid=1.7", description: "Elevate your look with our tailored blazer and skirt.", category: "clothing" },
  { id: 5, name: "Shoes", price: 49.99, image: "https://img.kwcdn.com/product/1dec4a1170/5162f26f-308e-4081-8604-e86edbc4ffe1_800x800.jpeg.a.jpg", description: "Durable and stylish shoes.", category: "footwear" },
  { id: 6, name: "Socks", price: 5.99, image: "https://th.bing.com/th/id/OIP.xF1skFQmt2MpDlZGSzjwtwHaFN?cb=iwc2&rs=1&pid=ImgDetMain", description: "Stay warm and comfortable all day.", category: "footwear" },
  { id: 7, name: "Backpack", price: 29.99, image: "https://th.bing.com/th/id/OIP.omnkFmSWoaGpVM6W3G95agHaIo?w=167&h=194&c=7&r=0&o=5&cb=iwc2&pid=1.7", description: "Spacious backpack for everyday use.", category: "accessories" },
  { id: 8, name: "Glassess", price: 9.99, image: "https://th.bing.com/th/id/OIP.RDGIBhmfFnAIUxAFHlOGPAHaJQ?w=145&h=181&c=7&r=0&o=5&cb=iwc2&pid=1.7", description: "Comfortable stylish glasses", category: "accessories" }

];

const productsContainer = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const searchInput = document.getElementById("search");
const checkoutBtn = document.getElementById("checkout-btn");
const productDetail = document.getElementById("product-detail");
const closeDetailBtn = document.getElementById("close-detail");
const detailImage = document.getElementById("detail-image");
const detailName = document.getElementById("detail-name");
const detailPrice = document.getElementById("detail-price");
const detailDescription = document.getElementById("detail-description");
const detailAddToCart = document.getElementById("detail-add-to-cart");
const checkoutModal = document.getElementById("checkout-modal");
const closeCheckout = document.getElementById("close-checkout");

let cart = [];
let selectedProduct = null;

function renderProducts(filter = "", category = "all") {
  productsContainer.innerHTML = "";
  products
    .filter(product =>
      product.name.toLowerCase().includes(filter.toLowerCase()) &&
      (category === "all" || product.category === category)
    )
    .forEach(product => {
      const productEl = document.createElement("div");
      productEl.className = "product";
      productEl.innerHTML = `
        <img src="${product.image}" alt="${product.name}" onclick="showDetail(${product.id})" />
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <p>${product.description}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productsContainer.appendChild(productEl);
    });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartItems.appendChild(li);
    total += item.price;
  });
  cartTotal.textContent = total.toFixed(2);
}

function showDetail(productId) {
  selectedProduct = products.find(p => p.id === productId);
  detailImage.src = selectedProduct.image;
  detailName.textContent = selectedProduct.name;
  detailPrice.textContent = `$${selectedProduct.price.toFixed(2)}`;
  detailDescription.textContent = selectedProduct.description;
  productDetail.classList.remove("hidden");
}

detailAddToCart.addEventListener("click", () => {
  if (selectedProduct) {
    addToCart(selectedProduct.id);
    productDetail.classList.add("hidden");
  }
});

closeDetailBtn.addEventListener("click", () => {
  productDetail.classList.add("hidden");
});

checkoutBtn.addEventListener("click", () => {
  cart = [];
  updateCart();
  checkoutModal.classList.remove("hidden");
});

closeCheckout.addEventListener("click", () => {
  checkoutModal.classList.add("hidden");
});

searchInput.addEventListener("input", (e) => {
  renderProducts(e.target.value);
});

function filterByCategory(category) {
  const query = searchInput.value;
  renderProducts(query, category);
}

renderProducts();
