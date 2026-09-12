function getCategoryName() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return (
        params.get("name") || "all"
    );

}


function createCategoryProduct(product) {

    const card =
        document.createElement("article");

    card.className =
        "product-card";

    const liked =
        isWishlisted(product.id);


    card.innerHTML = `

        <div class="product-image">

            <span class="deal-tag">
                DEAL
            </span>

            <button class="heart ${
                liked ? "active" : ""
            }">

                ${liked ? "♥" : "♡"}

            </button>

            <span class="product-icon">
                ${product.icon}
            </span>

        </div>

        <div class="product-info">

            <h3>
                ${product.name}
            </h3>

            <div class="rating">
                ⭐ ${product.rating}
                <span>
                    (${product.reviews.toLocaleString()})
                </span>
            </div>

            <div class="price">

                ₹${product.price.toLocaleString("en-IN")}

                <del>
                    ₹${product.oldPrice.toLocaleString("en-IN")}
                </del>

            </div>

            <button class="amazon-btn">
                View on Amazon →
            </button>

        </div>
    `;


    card.querySelector(".heart")
        .onclick = (event) => {

            event.stopPropagation();

            toggleWishlist(product.id);

            renderCategoryProducts();

        };


    card.querySelector(".amazon-btn")
        .onclick = (event) => {

            event.stopPropagation();

            openRetailer(
                product.affiliate
            );

        };


    card.onclick = () => {

        window.location.href =
            `product.html?id=${product.id}`;

    };


    return card;

}


function renderCategoryProducts() {

    const name =
        getCategoryName();

    const title =
        document.getElementById(
            "categoryTitle"
        );


    let result;


    if (
        name.toLowerCase() === "all"
    ) {

        result = products;

    } else {

        result =
            products.filter(
                product =>
                    product.category ===
                    name.toLowerCase()
            );

    }


    if (title) {

        title.textContent =
            name === "all"
                ? "All Products"
                : `${name} Products`;

    }


    const container =
        document.getElementById(
            "categoryProducts"
        );

    container.innerHTML = "";


    result.forEach(product => {

        container.appendChild(
            createCategoryProduct(product)
        );

    });

}


document.addEventListener(
    "DOMContentLoaded",
    renderCategoryProducts
);