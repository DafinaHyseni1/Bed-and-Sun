document.addEventListener("DOMContentLoaded", function() {
    window.scrollTo(0, 0);  // Shkon në pozicionin më të lartë të faqes
});


// Scroll Spy për të theksuar linkun aktiv në bazë të seksionit
document.addEventListener("scroll", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 50) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(currentSection)) {
            link.classList.add("active");
        }
    });
});


// Selektimi i elementeve të nevojshme
const cartSection = document.getElementById('cart-section');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalPrice = document.getElementById('cart-total-price');

// Lista e artikujve në shportë
let cartItems = [];

// Funksioni për shtimin e artikullit në shportë
function addToCart(title, price) {
    // Shto artikullin në listën e shportës
    cartItems.push({ title, price });
    updateCart();
    openCart(); // Hap shportën automatikisht
}

// Funksioni për përditësimin e përmbajtjes së shportës
function updateCart() {
    // Pastro përmbajtjen e mëparshme
    cartItemsContainer.innerHTML = '';

    // Për çdo artikull në shportë
    let total = 0;
    cartItems.forEach((item, index) => {
        total += item.price;

        // Krijo një div për çdo artikull
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <p>${item.title} - $${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    // Përditëso totalin
    cartTotalPrice.textContent = total.toFixed(2);
}

// Funksioni për hapjen e seksionit të shportës
function openCart() {
    cartSection.style.display = 'block'; // Trego seksionin e shportës
}

// Funksioni për heqjen e artikullit nga shporta
function removeFromCart(index) {
    cartItems.splice(index, 1); // Hiq artikullin nga lista
    updateCart(); // Përditëso shportën
    if (cartItems.length === 0) {
        closeCart(); // Mbyll shportën nëse nuk ka artikuj
    }
}

// Funksioni për mbylljen e shportës nëse nuk ka artikuj
function closeCart() {
    cartSection.style.display = 'none';
}

// Initialize the cart
let cart = [];

// Function to update the cart display with modern, professional UI
function updateCart() {
    let cartSection = document.getElementById("cart-section");

    // If cart section doesn't exist, create it dynamically
    if (!cartSection) {
        cartSection = document.createElement("section");
        cartSection.id = "cart-section";
        document.body.appendChild(cartSection);
    }

    // Clear previous cart contents
    cartSection.innerHTML = "";

    // Create the cart container with a smooth animation
    const cartContainer = document.createElement("div");
    cartContainer.id = "cart-container";
    cartContainer.style.position = "fixed";
    cartContainer.style.top = "50%";
    cartContainer.style.left = "50%";
    cartContainer.style.transform = "translate(-50%, -50%)";
    cartContainer.style.width = "450px";
    cartContainer.style.maxHeight = "80%";
    cartContainer.style.overflowY = "auto";
    cartContainer.style.backgroundColor = "#fff";
    cartContainer.style.borderRadius = "12px";
    cartContainer.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
    cartContainer.style.padding = "30px";
    cartContainer.style.zIndex = "100";
    cartContainer.style.opacity = "0";
    cartContainer.style.transition = "opacity 0.3s ease-in-out";
    cartContainer.style.animation = "cartSlideIn 0.5s ease-out";

    // Create close button dynamically
    const closeButton = document.createElement("button");
    closeButton.innerHTML = "&times;";
    closeButton.style.backgroundColor = "transparent";
    closeButton.style.border = "none";
    closeButton.style.fontSize = "30px";
    closeButton.style.color = "#333";
    closeButton.style.cursor = "pointer";
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "10px";
    closeButton.addEventListener("click", closeCart);

    cartContainer.appendChild(closeButton);

    // If the cart is empty, show message
    if (cart.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.innerText = "Your cart is empty!";
        emptyMessage.style.textAlign = "center";
        emptyMessage.style.fontSize = "18px";
        cartContainer.appendChild(emptyMessage);
    } else {
        // Loop through cart items and display them
        cart.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item");
            itemDiv.style.marginBottom = "20px";
            itemDiv.style.borderBottom = "1px solid #ddd";
            itemDiv.style.paddingBottom = "15px";

            itemDiv.innerHTML = `
                <h3 style="font-size: 18px; color: #333; font-weight: bold;">${item.name}</h3>
                <p style="color: #555; font-size: 16px;">Price: $${item.price.toFixed(2)}</p>
                <div style="display: flex; align-items: center; margin-top: 10px;">
                    <button class="quantity-btn" onclick="adjustQuantity('${item.name}', -1)" style="background-color:rgb(201, 136, 117); color: #fff; border: none; padding: 8px 12px; border-radius: 5px; font-size: 18px; cursor: pointer;">-</button>
                    <span class="quantity" style="font-size: 18px; margin: 0 15px;">${item.quantity}</span>
                    <button class="quantity-btn" onclick="adjustQuantity('${item.name}', 1)" style="background-color:rgb(175, 112, 76); color: #fff; border: none; padding: 8px 12px; border-radius: 5px; font-size: 18px; cursor: pointer;">+</button>
                </div>
                <p style="font-weight: bold; font-size: 16px; color: #333;">Total: $${(item.price * item.quantity).toFixed(2)}</p>
            `;

            cartContainer.appendChild(itemDiv);
        });

        // Calculate and display total price
        const totalValue = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        const totalDiv = document.createElement("div");
        totalDiv.classList.add("cart-total");
        totalDiv.style.marginTop = "20px";
        totalDiv.innerHTML = `
            <h3 style="font-size: 20px; color: #333;">Total Price: $${totalValue.toFixed(2)}</h3>
        `;
        cartContainer.appendChild(totalDiv);

        // Payment methods section
        const paymentDiv = document.createElement("div");
        paymentDiv.style.marginTop = "20px";
        paymentDiv.innerHTML = `
            <h4 style="font-size: 18px; color: #333; margin-bottom: 10px;">Choose Payment Method</h4>
            <select id="payment-method" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 16px;">
                <option value="credit-card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank-transfer">Bank Transfer</option>
            </select>
            <button style="background-color:rgb(160, 134, 85); color: #fff; padding: 10px 20px; font-size: 18px; border: none; border-radius: 6px; width: 100%; margin-top: 20px; cursor: pointer;" onclick="proceedToCheckout()">Proceed to Checkout</button>
        `;
        cartContainer.appendChild(paymentDiv);
    }

    // Display the cart container with smooth fade-in
    cartSection.style.display = "flex";
    setTimeout(() => {
        cartContainer.style.opacity = "1";
    }, 50);

    cartSection.appendChild(cartContainer);
}

// Function to adjust the quantity of an item
function adjustQuantity(itemName, delta) {
    const item = cart.find(i => i.name === itemName);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        // Remove item from cart if quantity is zero or negative
        cart = cart.filter(i => i.name !== itemName);
    }

    updateCart();  // Re-render cart after quantity adjustment
}

// Function to add items to the cart
function addToCart(event) {
    const button = event.target;
    const title = button.getAttribute("data-title");
    const price = parseFloat(button.getAttribute("data-price"));

    const existingItem = cart.find(item => item.name === title);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: title,
            price: price,
            quantity: 1
        });
    }

    updateCart();  // Update the cart after adding an item
}

// Function to close the cart
function closeCart() {
    const cartSection = document.getElementById("cart-section");
    if (cartSection) {
        const cartContainer = document.getElementById("cart-container");
        cartContainer.style.opacity = "0";

        setTimeout(() => {
            cartSection.style.display = "none";
        }, 300);
    }
}

// Function to proceed to checkout (example functionality)
function proceedToCheckout() {
    const paymentMethod = document.getElementById("payment-method").value;
    alert(`Proceeding with ${paymentMethod}...`);
}

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll('.shop-item-btn').forEach(button => {
    button.addEventListener('click', addToCart);
});
