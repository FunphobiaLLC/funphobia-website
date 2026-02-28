<script>

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;

    // Loop through cart properly
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

    // Animate cart count pop
    cartCount.style.transform = "scale(1.3)";
    setTimeout(() => {
        cartCount.style.transform = "scale(1)";
    }, 200);

    cartTotal.innerText = "Total: $" + total.toFixed(2);
    localStorage.setItem("cart", JSON.stringify(cart));
}

// REMOVE ITEM must be OUTSIDE updateCart
function removeItem(event, index) {
    event.stopPropagation(); // 🚫 prevents cart from closing
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    document.getElementById("cart-panel").classList.toggle("active");
}

// Close cart when clicking outside
document.addEventListener("click", function(event) {
    const cartPanel = document.getElementById("cart-panel");
    const cartIcon = document.querySelector(".cart-button");

    if (!cartPanel.contains(event.target) && 
        !cartIcon.contains(event.target) && 
        cartPanel.classList.contains("active")) {
        cartPanel.classList.remove("active");
    }
});

</script>
