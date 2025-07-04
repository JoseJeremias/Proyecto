document.addEventListener("DOMContentLoaded", () => {
    const btnMenu = document.getElementById("nav-cel");
    const navLinks = document.getElementById("navlinks");

    if (!btnMenu || !navLinks) {
        console.warn("⚠️ Elementos del menú no encontrados en el DOM.");
        return;
    }

    const isMenuOpen = () => navLinks.classList.contains("active");

    const updateMenuAccessibility = (open) => {
        btnMenu.setAttribute("aria-expanded", String(open));
        btnMenu.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
        btnMenu.classList.toggle("active", open);
    };

    const toggleMenu = () => {
        const isOpen = navLinks.classList.toggle("active");
        updateMenuAccessibility(isOpen);
    };

    const closeMenu = () => {
        if (isMenuOpen()) {
            navLinks.classList.remove("active");
            updateMenuAccessibility(false);
        }
    };

    // Eventos del menú
    btnMenu.addEventListener("click", toggleMenu);

    navLinks.addEventListener("click", (e) => {
        if (e.target.matches("a")) closeMenu();
    });

    document.addEventListener("click", (e) => {
        const isClickOutside =
            isMenuOpen() &&
            !navLinks.contains(e.target) &&
            !btnMenu.contains(e.target);
        if (isClickOutside) closeMenu();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isMenuOpen()) {
            closeMenu();
            btnMenu.focus();
        }
    });

    // =============================
    // 📌 Extra: Mejor UX para FAQ
    // =============================
    const detallesFAQ = document.querySelectorAll(".faq details");

    detallesFAQ.forEach((detail) => {
        detail.addEventListener("toggle", () => {
            if (detail.open) {
                detallesFAQ.forEach((other) => {
                    if (other !== detail) other.removeAttribute("open");
                });
            }
        });

        // Accesibilidad extra (para navegadores que no enfocan automáticamente el summary)
        const summary = detail.querySelector("summary");
        summary && summary.setAttribute("tabindex", "0");
    });
});