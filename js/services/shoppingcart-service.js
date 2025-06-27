//let cartService;
//
//class ShoppingCartService {
//
//    cart = {
//
//        items: [],
//
//        total: 0
//
//    };
//
//    addToCart(productId) {
//
//        const url = `${config.baseUrl}/cart/products/${productId}`;
//
//        // const headers = userService.getHeaders();
//
//        axios.post(url, {}) // , {headers})
//
//            .then(response => {
//
//                this.setCart(response.data);
//
//                this.updateCartDisplay();
//
//            })
//
//            .catch(error => {
//
//                const data = {
//
//                    error: "Add to cart failed."
//
//                };
//
//                templateBuilder.append("error", data, "errors");
//
//            });
//
//    }
//
//    setCart(data) {
//
//        this.cart = {
//
//            items: [],
//
//            total: 0
//
//        };
//
//        this.cart.total = data.total;
//
//        for (const [key, value] of Object.entries(data.items)) {
//
//            this.cart.items.push(value);
//
//        }
//
//    }
//
//    loadCart() {
//
//        const url = `${config.baseUrl}/cart`;
//
//        axios.get(url)
//
//            .then(response => {
//
//                this.setCart(response.data);
//
//                this.updateCartDisplay();
//
//            })
//
//            .catch(error => {
//
//                const data = {
//
//                    error: "Load cart failed."
//
//                };
//
//                templateBuilder.append("error", data, "errors");
//
//            });
//
//    }
//
//    loadCartPage() {
//
//        const main = document.getElementById("main");
//
//        main.innerHTML = "";
//
//        let div = document.createElement("div");
//
//        div.classList = "filter-box";
//
//        main.appendChild(div);
//
//        const contentDiv = document.createElement("div");
//contentDiv.id = "content";
//
//        contentDiv.classList.add("content-form");
//
//        const cartHeader = document.createElement("div");
//
//        cartHeader.classList.add("cart-header");
//
//        const h1 = document.createElement("h1");
//
//        h1.innerText = "Cart";
//
//        cartHeader.appendChild(h1);
//
//        const clearButton = document.createElement("button");
//
//        clearButton.classList.add("btn", "btn-danger");
//
//        clearButton.innerText = "Clear";
//
//        clearButton.addEventListener("click", () => this.clearCart());
//
//        cartHeader.appendChild(clearButton);
//
//        // ✅ NEWLY ADDED CHECKOUT BUTTON (when cart is dynamically rendered)
//
//        const checkoutButton = document.createElement("button");
//
//        checkoutButton.classList.add("btn", "btn-success");
//
//        checkoutButton.innerText = "Checkout";
//
//        checkoutButton.addEventListener("click", () => this.checkout());
//
//        cartHeader.appendChild(checkoutButton);
//
//        contentDiv.appendChild(cartHeader);
//
//        main.appendChild(contentDiv);
//
//        this.cart.items.forEach(item => {
//
//            this.buildItem(item, contentDiv);
//
//        });
//
//    }
//
//    buildItem(item, parent) {
//
//        let outerDiv = document.createElement("div");
//
//        outerDiv.classList.add("cart-item");
//
//        let div = document.createElement("div");
//
//        outerDiv.appendChild(div);
//
//        let h4 = document.createElement("h4");
//
//        h4.innerText = item.product.name;
//
//        div.appendChild(h4);
//
//        let photoDiv = document.createElement("div");
//
//        photoDiv.classList.add("photo");
//
//        let img = document.createElement("img");
//
//        img.src = `/images/products/${item.product.imageUrl}`;
//
//        img.addEventListener("click", () => {
//
//            showImageDetailForm(item.product.name, img.src);
//
//        });
//
//        photoDiv.appendChild(img);
//
//        let priceH4 = document.createElement("h4");
//
//        priceH4.classList.add("price");
//
//        priceH4.innerText = `$${item.product.price}`;
//
//        photoDiv.appendChild(priceH4);
//
//        outerDiv.appendChild(photoDiv);
//
//        let descriptionDiv = document.createElement("div");
//
//        descriptionDiv.innerText = item.product.description;
//
//        outerDiv.appendChild(descriptionDiv);
//
//        let quantityDiv = document.createElement("div");
//
//        quantityDiv.innerText = `Quantity: ${item.quantity}`;
//
//        outerDiv.appendChild(quantityDiv);
//
//        let removeDiv = document.createElement("button");
//
//        removeDiv.innerText = 'Remove';
//
//        removeDiv.addEventListener("click", () => {
//
//            console.log('success');
//
//        });
//
//        outerDiv.appendChild(removeDiv);
//
//        let addQuantityDiv = document.createElement("button");
//
//        addQuantityDiv.innerText = 'Add Quantity';
//
//        addQuantityDiv.addEventListener("click", () => {
//
//            this.addToCart(`${item.product.productId}`);
//               this.loadCartPage();
//
//        });
//
//        outerDiv.appendChild(addQuantityDiv);
//
//        parent.appendChild(outerDiv);
//
//    }
//
//    clearCart() {
//
//        const url = `${config.baseUrl}/cart`;
//
//        axios.delete(url)
//
//            .then(response => {
//
//                this.cart = {
//
//                    items: [],
//
//                    total: 0
//
//                };
//
//                this.cart.total = response.data.total;
//
//                for (const [key, value] of Object.entries(response.data.items)) {
//
//                    this.cart.items.push(value);
//
//                }
//
//                this.updateCartDisplay();
//
//                this.loadCartPage();
//
//            })
//
//            .catch(error => {
//
//                const data = {
//
//                    error: "Empty cart failed."
//
//                };
//
//                templateBuilder.append("error", data, "errors");
//
//            });
//
//    }
//
//    updateCartDisplay() {
//
//        try {
//
//            const itemCount = this.cart.items.length;
//
//            const cartControl = document.getElementById("cart-items");
//
//            cartControl.innerText = itemCount;
//
//        } catch (e) {
//
//            // fail silently
//
//        }
//
//    }
//
//    // ✅✅✅ NEWLY ADDED METHOD: Checkout logic using backend
//
//   checkout() {
//      // ✅ Prevent checkout if the cart is empty
//      if (this.cart.items.length === 0) {
//          alert("Your cart is empty. Please add items before checking out.");
//          return;
//      }
//      const url = `${config.baseUrl}/order`;
//      axios.post(url, {}, userService.getHeaders())
//          .then(response => {
//              alert("Checkout successful!");
//              this.cart = { items: [], total: 0 };
//              this.updateCartDisplay();
//              this.loadCartPage();
//          })
//          .catch(error => {
//              const data = { error: "Checkout failed. Please try again." };
//              templateBuilder.append("error", data, "errors");
//          });
//   }
//
//}
//
//// ✅ INIT ON PAGE LOAD
//
//document.addEventListener('DOMContentLoaded', () => {
//
//    cartService = new ShoppingCartService();
//
//    if (userService.isLoggedIn()) {
//
//        cartService.loadCart();
//
//    }
//
//});
let cartService;

class ShoppingCartService {

    cart = {

        items: [],

        total: 0

    };

    // ✅ Adds a product to the cart and accepts optional callback

    addToCart(productId, callback = () => {}) {

        const url = `${config.baseUrl}/cart/products/${productId}`;

        axios.post(url, {})

            .then(response => {

                this.setCart(response.data);

                this.updateCartDisplay();

                callback(); // Allow caller to update UI (like quantity)

            })

            .catch(error => {

                const data = { error: "Add to cart failed." };

                templateBuilder.append("error", data, "errors");

            });

    }

    // ✅ Removes a product from the cart by productId

    removeFromCart(productId, callback = () => {}) {

        const url = `${config.baseUrl}/cart/products/${productId}`;

        axios.delete(url)

            .then(response => {

                this.setCart(response.data);

                this.updateCartDisplay();

                callback(); // Allow caller to refresh UI

            })

            .catch(error => {

                const data = { error: "Remove from cart failed." };

                templateBuilder.append("error", data, "errors");

            });

    }

    // ✅ Loads the user's cart data from the backend

    loadCart() {

        const url = `${config.baseUrl}/cart`;

        axios.get(url)

            .then(response => {

                this.setCart(response.data);

                this.updateCartDisplay();

            })

            .catch(error => {

                const data = { error: "Load cart failed." };

                templateBuilder.append("error", data, "errors");

            });

    }

    // ✅ Updates local cart data structure

    setCart(data) {

        this.cart = {

            items: [],

            total: 0

        };

        this.cart.total = data.total;

        for (const [key, value] of Object.entries(data.items)) {

            this.cart.items.push(value);

        }

    }

    // ✅ Rebuilds the entire cart page UI

    loadCartPage() {

        const main = document.getElementById("main");

        main.innerHTML = "";

        let div = document.createElement("div");

        div.classList = "filter-box";

        main.appendChild(div);

        const contentDiv = document.createElement("div");
contentDiv.id = "content";

        contentDiv.classList.add("content-form");

        const cartHeader = document.createElement("div");

        cartHeader.classList.add("cart-header");

        const h1 = document.createElement("h1");

        h1.innerText = "Cart";

        cartHeader.appendChild(h1);

        // ✅ Clear Cart Button

        const clearButton = document.createElement("button");

        clearButton.classList.add("btn", "btn-danger");

        clearButton.innerText = "Clear";

        clearButton.addEventListener("click", () => this.clearCart());

        cartHeader.appendChild(clearButton);

        // ✅ Checkout Button

        const checkoutButton = document.createElement("button");

        checkoutButton.classList.add("btn", "btn-success");

        checkoutButton.innerText = "Checkout";

        checkoutButton.addEventListener("click", () => this.checkout());

        cartHeader.appendChild(checkoutButton);

        contentDiv.appendChild(cartHeader);

        main.appendChild(contentDiv);

        this.cart.items.forEach(item => {

            this.buildItem(item, contentDiv);

        });

    }

    // ✅ Builds each individual cart item UI block

    buildItem(item, parent) {

        let outerDiv = document.createElement("div");

        outerDiv.classList.add("cart-item");

        let div = document.createElement("div");

        outerDiv.appendChild(div);

        let h4 = document.createElement("h4");

        h4.innerText = item.product.name;

        div.appendChild(h4);

        let photoDiv = document.createElement("div");

        photoDiv.classList.add("photo");

        let img = document.createElement("img");

        img.src = `/images/products/${item.product.imageUrl}`;

        img.addEventListener("click", () => {

            showImageDetailForm(item.product.name, img.src);

        });

        photoDiv.appendChild(img);

        let priceH4 = document.createElement("h4");

        priceH4.classList.add("price");

        priceH4.innerText = `$${item.product.price}`;

        photoDiv.appendChild(priceH4);

        outerDiv.appendChild(photoDiv);

        let descriptionDiv = document.createElement("div");

        descriptionDiv.innerText = item.product.description;

        outerDiv.appendChild(descriptionDiv);

        // ✅ Quantity Display

        let quantityDiv = document.createElement("div");

        quantityDiv.innerText = `Quantity: ${item.quantity}`;

        outerDiv.appendChild(quantityDiv);

        // ✅ Remove Button with working API call

        let removeDiv = document.createElement("button");

        removeDiv.innerText = 'Remove';

        removeDiv.addEventListener("click", () => {

            this.removeFromCart(item.product.productId, () => {

                this.loadCartPage(); // Refresh the cart UI

            });

        });

        outerDiv.appendChild(removeDiv);

        // ✅ Add Quantity Button

        let addQuantityDiv = document.createElement("button");

        addQuantityDiv.innerText = 'Add Quantity';

        addQuantityDiv.addEventListener("click", () => {

            this.addToCart(`${item.product.productId}`, () => {

                const updatedItem = this.cart.items.find(i => i.product.productId === item.product.productId);

                if (updatedItem) {

                    quantityDiv.innerText = `Quantity: ${updatedItem.quantity}`;

                }

            });

        });

        outerDiv.appendChild(addQuantityDiv);

        parent.appendChild(outerDiv);

    }

    // ✅ Empties the entire cart

    clearCart() {

        const url = `${config.baseUrl}/cart`;

        axios.delete(url)

            .then(response => {

                this.setCart(response.data);

                this.updateCartDisplay();

                this.loadCartPage();

            })

            .catch(error => {

                const data = { error: "Empty cart failed." };

                templateBuilder.append("error", data, "errors");

            });

    }

    // ✅ Updates the mini cart item count

    updateCartDisplay() {

        try {

            const itemCount = this.cart.items.length;

            const cartControl = document.getElementById("cart-items");

            cartControl.innerText = itemCount;

        } catch (e) {

            // Fail silently if element not found

        }

    }

    // ✅ Checkout logic: Sends POST request to /order
checkout() {
   // ✅ Prevent checkout if the cart is empty
   if (this.cart.items.length === 0) {
       alert("Your cart is empty. Please add items before checking out.");
       return;
   }
   // ✅ Define fixed shipping cost
   const SHIPPING_COST = 20.00;
   // ✅ Extract and calculate total values
   const total = this.cart.total;
   const finalAmount = (total + SHIPPING_COST).toFixed(2);
   const formattedTotal = total.toFixed(2);
   // ✅ Show confirmation prompt with cost breakdown
   const confirmed = confirm(
       `Your cart total is $${formattedTotal}.\nShipping cost: $${SHIPPING_COST.toFixed(2)}\n\nFinal amount: $${finalAmount}\n\nAre you sure you want to checkout?`
   );
   if (!confirmed) {
       return; // ✅ Stop if user cancels
   }
   // ✅ Proceed with checkout API request
   const url = `${config.baseUrl}/order`;
   axios.post(url, {}, userService.getHeaders())
       .then(response => {
           alert("Checkout successful!");
           // ✅ Reset local cart and UI
           this.cart = { items: [], total: 0 };
           this.updateCartDisplay();
           this.loadCartPage();
       })
       .catch(error => {
           // ✅ Show error message on failure
           const data = { error: "Checkout failed. Please try again." };
           templateBuilder.append("error", data, "errors");
       });
}


}

// ✅ Initialize cart service when page loads

document.addEventListener('DOMContentLoaded', () => {

    cartService = new ShoppingCartService();
    if (userService.isLoggedIn()) {
        cartService.loadCart();

    }

});
