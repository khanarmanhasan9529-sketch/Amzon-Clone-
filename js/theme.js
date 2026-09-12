const colors = [

    "#ff9900",
    "#4f46e5",
    "#0891b2",
    "#16a34a",
    "#db2777"

];


let colorIndex =
    Number(
        localStorage.getItem("colorIndex") || 0
    );


function applyTheme() {

    const dark =
        localStorage.getItem("darkMode") === "true";

    document.body.classList.toggle(
        "dark",
        dark
    );

    const themeBtn =
        document.getElementById("themeBtn");

    if (themeBtn) {

        themeBtn.textContent =
            dark ? "☀️" : "🌙";

    }

    document.documentElement.style.setProperty(
        "--accent",
        colors[colorIndex]
    );

}


function toggleTheme() {

    const current =
        localStorage.getItem("darkMode") === "true";

    localStorage.setItem(
        "darkMode",
        String(!current)
    );

    applyTheme();

}


function changeColor() {

    colorIndex =
        (colorIndex + 1) %
        colors.length;

    localStorage.setItem(
        "colorIndex",
        colorIndex
    );

    applyTheme();

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        applyTheme();

        const themeBtn =
            document.getElementById("themeBtn");

        const colorBtn =
            document.getElementById("colorBtn");

        if (themeBtn) {

            themeBtn.addEventListener(
                "click",
                toggleTheme
            );

        }

        if (colorBtn) {

            colorBtn.addEventListener(
                "click",
                changeColor
            );

        }

    }
);