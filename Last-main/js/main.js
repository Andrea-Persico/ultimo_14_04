// Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// let all_products = ["TRAVEL BAG", "IPAD PRO", "PASSAPORTO WALLET", "RAY BAN", "JACKET", "BEATS MIUSIC", "ADATTATORE"]
let all_products = [];
// Apri la Carta
cartIcon.onclick = () => {
    cart.classList.add("active");
};
// Chiude la Carta
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// Carta Working JS
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}
// Fa la funzione
function ready() {
    // Remove Items From Cart
    var removeCartButtons = document.getElementsByClassName("cart-remove")
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    // Quantity Change
    var quantityInputs = document.getElementsByClassName("cart-quantity")
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //  Add to Cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    // Buy Button Work
    document
        .getElementsByClassName("btn-buy")[0]
        .addEventListener("click", buyButtonClicked);
}
// Buy Button !!!!!!! rivedere!!!!!!
function buyButtonClicked() {
    alert("You Order is Place")
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChil()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}
// Remove Items From Cart !!!!!! rivedere!!!!!!
function removeCartItem(event) {
    all_products = [];
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}
// Quantity Changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}
// Add To Cart !!!!!! Rivedere Provare con console.log se li stampa
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg) {

    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsName = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < all_products.length; i++) {
        if (title === all_products[i]) {
            alert("You have already add this item to cart");
            return;
        }
    }
    all_products.push(title);
    // Rivedere!!!!!!!!!! non sono sicuro di questo passaggio????? anche del return sopra
    var cartBoxeContent = `<img src="${productImg}" alt="" class="cart-img">
            <div class="detail-box">
              <div class="cart-product-title">${title}</div>
              <div class="cart-price">${price}</div>
              <input type="number" value="1" class="cart-quantity">

            </div>
            <i class="bx bxs-trash-alt cart-remove"></i>`;


    cartShopBox.innerHTML = cartBoxeContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);



}
// Update Total !!!!! rivedere!!!!!
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBoxe = cartBoxes[i];
        var priceElement = cartBoxe.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBoxe.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("€", ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
        document.getElementsByClassName("total-price")[0].innerText = "€" + total;
    }

    if (cartBoxes.length === 0) {
        document.getElementsByClassName("total-price")[0].innerText = "€" + total;
    }
    // if the price contein some cent value
    total = Math.round(total * 100) / 100;

    // document.getElementById("test").innerText = "€" + total;
}