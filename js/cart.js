// ===============================
// LOAD COMPONENTS
// ===============================

// Navbar
fetch("components/navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
  });

// Cart Panel
fetch("components/cart-panel.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("cart-container").innerHTML = data;

    // 🔥 Reload cart AFTER panel exists
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    updateCart();
  });

// Footer
fetch("components/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });


// ===============================
// CART LOGIC
// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    // 🔥 Prevent errors if cart panel not loaded yet
    if (!cartItems || !cartCount || !cartTotal) return;

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        cartItems.innerHTML += `
        <div class="cart-item">
            ${item.name} - $${item.price.toFixed(2)}
            <button onclick="removeItem(event, ${index})"
                style="float:right; background:red; border:none; color:white; cursor:pointer;">
                ✖
            </button>
        </div>`;
    });

    cartCount.innerText = cart.length;

    // Animate cart count
    cartCount.style.transform = "scale(1.3)";
    setTimeout(() => {
        cartCount.style.transform = "scale(1)";
    }, 200);

    cartTotal.innerText = "Total: $" + total.toFixed(2);

    localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(event, index) {
    event.stopPropagation();
    cart.splice(index, 1);
    updateCart();
}
function goToCheckout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    window.open("https://example.com", "_blank");
}

function toggleCart() {
    const panel = document.getElementById("cart-panel");
    if (panel) panel.classList.toggle("active");
}


// ===============================
// CLICK OUTSIDE TO CLOSE
// ===============================

document.addEventListener("click", function(event) {

    const cartPanel = document.getElementById("cart-panel");
    const cartIcon = document.querySelector(".cart-button");

    if (!cartPanel || !cartIcon) return;

    if (!cartPanel.contains(event.target) &&
        !cartIcon.contains(event.target) &&
        cartPanel.classList.contains("active")) {

        cartPanel.classList.remove("active");
    }
});
