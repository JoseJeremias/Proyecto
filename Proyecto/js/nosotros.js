document.addEventListener("DOMContentLoaded", () => {
    const btnMenuMovil = document.getElementById("nav-cel");
    const menuLinks = document.getElementById("navlinks");

    if (!btnMenuMovil || !menuLinks) {
        console.warn("⚠️ Elementos del menú no encontrados en el DOM.");
        return;
    }

    const isMenuOpen = () => menuLinks.classList.contains("active");

    const toggleMenu = () => {
        const active = !isMenuOpen();
        menuLinks.classList.toggle("active", active);
        btnMenuMovil.classList.toggle("active", active);
        btnMenuMovil.setAttribute("aria-expanded", String(active));
        btnMenuMovil.setAttribute("aria-label", active ? "Cerrar menú" : "Abrir menú");
    };

    const closeMenu = () => {
        if (isMenuOpen()) {
            menuLinks.classList.remove("active");
            btnMenuMovil.classList.remove("active");
            btnMenuMovil.setAttribute("aria-expanded", "false");
            btnMenuMovil.setAttribute("aria-label", "Abrir menú");
        }
    };

    btnMenuMovil.addEventListener("click", toggleMenu);

    menuLinks.addEventListener("click", (e) => {
        if (e.target.tagName === "A") closeMenu();
    });

    document.addEventListener("click", (e) => {
        if (
            isMenuOpen() &&
            !menuLinks.contains(e.target) &&
            !btnMenuMovil.contains(e.target)
        ) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isMenuOpen()) {
            closeMenu();
            btnMenuMovil.focus();
        }
    });

    // === Animación al hacer scroll para secciones nuevas ===
    const animarEntrada = (elemento) => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(elemento);
    };

    const seccionesAnimables = document.querySelectorAll(
        ".mision, .vision, .reconocimientos, .testimonios blockquote"
    );

    seccionesAnimables.forEach(animarEntrada);
});