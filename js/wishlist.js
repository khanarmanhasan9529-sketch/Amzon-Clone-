function getWishlist() {

    return JSON.parse(
        localStorage.getItem("wishlist") || "[]"
    );

}


function saveWishlist(list) {

    localStorage.setItem(
        "wishlist",
        JSON.stringify(list)
    );

}


function toggleWishlist(id) {

    let list = getWishlist();

    if (list.includes(id)) {

        list = list.filter(
            item => item !== id
        );

    } else {

        list.push(id);

    }

    saveWishlist(list);

    updateWishlistCount();

    renderProductsIfAvailable();

}


function isWishlisted(id) {

    return getWishlist().includes(id);

}


function updateWishlistCount() {

    const count =
        document.getElementById("wishlistCount");

    if (count) {

        count.textContent =
            getWishlist().length;

    }

}


function renderProductsIfAvailable() {

    if (typeof renderProducts === "function") {

        renderProducts();

    }

}


document.addEventListener(
    "DOMContentLoaded",
    updateWishlistCount
);