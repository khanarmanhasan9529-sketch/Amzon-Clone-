document.addEventListener(
    "DOMContentLoaded",
    () => {

        const total =
            document.getElementById(
                "wishlistTotal"
            );

        if (total) {

            total.textContent =
                getWishlist().length;

        }

    }
);