const AMAZON_LINK =
    "https://amazon-deals-theta.vercel.app/";


function openRetailer(url = AMAZON_LINK) {

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


function createCategory(category) {

    const card =
        document.createElement("button");

    card.className =
        "category-card";

    card.innerHTML = `

        <div class="category-icon">
            ${category.icon}
        </div>

        <strong>
            ${category.name}
        </strong>

    `;

    card.addEventListener(
        "click",
        () => {

            window.location.href =
                `category.html?name=${encodeURIComponent(
                    category.name
                )}`;

        }
    );

    return card;

}


function createProduct(product) {

    const liked =
        isWishlisted(product.id);

    const card =
        document.createElement("article");

    card.className =
        "product-card";

    card.innerHTML = `

        <div class="product-image">

            <span class="deal-tag">
                DEAL
            </span>

            <button
                class="heart ${liked ? "active" : ""}"
                aria-label="Wishlist"
            >
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
        .addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                toggleWishlist(product.id);

            }
        );


    card.addEventListener(
        "click",
        (event) => {

            if (
                event.target.closest(".heart") ||
                event.target.closest(".amazon-btn")
            ) return;

            window.location.href =
                `product.html?id=${product.id}`;

        }
    );


    card.querySelector(".amazon-btn")
        .addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                openRetailer(
                    product.affiliate
                );

            }
        );


    return card;

}


function renderCategories() {

    const container =
        document.getElementById(
            "categoryList"
        );

    if (!container) return;

    container.innerHTML = "";

    categories.forEach(category => {

        container.appendChild(
            createCategory(category)
        );

    });

}


function renderProducts() {

    const horizontal =
        document.getElementById(
            "horizontalProducts"
        );

    const grid =
        document.getElementById(
            "productGrid"
        );

    const count =
        document.getElementById(
            "productCount"
        );


    if (horizontal) {

        horizontal.innerHTML = "";

        products.forEach(product => {

            horizontal.appendChild(
                createProduct(product)
            );

        });

    }


    if (grid) {

        grid.innerHTML = "";

        products.forEach(product => {

            grid.appendChild(
                createProduct(product)
            );

        });

    }


    if (count) {

        count.textContent =
            `${products.length} items`;

    }

}


function searchProducts() {

    const input =
        document.getElementById(
            "searchInput"
        );

    const query =
        input.value
            .trim()
            .toLowerCase();


    const grid =
        document.getElementById(
            "productGrid"
        );

    const horizontal =
        document.getElementById(
            "horizontalProducts"
        );


    const results =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(query)

        );


    if (grid) {

        grid.innerHTML = "";

        results.forEach(product => {

            grid.appendChild(
                createProduct(product)
            );

        });

    }


    if (horizontal) {

        horizontal.innerHTML = "";

        results.forEach(product => {

            horizontal.appendChild(
                createProduct(product)
            );

        });

    }


    const count =
        document.getElementById(
            "productCount"
        );

    if (count) {

        count.textContent =
            `${results.length} items`;

    }

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderCategories();

        renderProducts();


        const search =
            document.getElementById(
                "searchInput"
            );

        if (search) {

            search.addEventListener(
                "input",
                searchProducts
            );

        }

    }
);