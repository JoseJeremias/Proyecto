document.addEventListener("DOMContentLoaded", () => {
    // =====================================
    // MENÚ MÓVIL
    // =====================================
    const btnMenuMovil = document.getElementById("nav-cel");
    const menuLinks = document.getElementById("navlinks");

    if (btnMenuMovil && menuLinks) {
        const toggleMenu = () => {
            const isActive = menuLinks.classList.toggle("active");
            btnMenuMovil.classList.toggle("active", isActive);
            btnMenuMovil.setAttribute("aria-expanded", String(isActive));
            btnMenuMovil.setAttribute(
                "aria-label",
                isActive ? "Cerrar menú de navegación" : "Abrir menú de navegación"
            );
        };

        const closeMenu = () => {
            if (menuLinks.classList.contains("active")) {
                menuLinks.classList.remove("active");
                btnMenuMovil.classList.remove("active");
                btnMenuMovil.setAttribute("aria-expanded", "false");
                btnMenuMovil.setAttribute("aria-label", "Abrir menú de navegación");
            }
        };

        btnMenuMovil.addEventListener("click", toggleMenu);

        document.addEventListener("click", (e) => {
            if (
                menuLinks.classList.contains("active") &&
                !menuLinks.contains(e.target) &&
                !btnMenuMovil.contains(e.target)
            ) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                closeMenu();
                btnMenuMovil.focus();
            }
        });

        menuLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });
    } else {
        console.warn("⚠️ Elementos del menú no encontrados en el DOM.");
    }

    // =====================================
    // CARRUSEL
    // =====================================
    const initCarousel = () => {
        const container = document.querySelector(".carousel-container");
        const slides = document.querySelectorAll(".carousel-slide");
        const prevBtn = document.querySelector(".carousel-btn.prev");
        const nextBtn = document.querySelector(".carousel-btn.next");
        const carousel = document.querySelector(".carousel");

        if (!container || slides.length === 0 || !prevBtn || !nextBtn) {
            console.warn("⚠️ Elementos del carrusel no encontrados en el DOM.");
            return;
        }

        let currentIndex = 0;
        let intervalId;

        const updateCarousel = () => {
            container.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        };

        const startAutoSlide = () => {
            intervalId = setInterval(nextSlide, 7000);
        };

        const stopAutoSlide = () => {
            clearInterval(intervalId);
        };

        nextBtn.addEventListener("click", nextSlide);
        prevBtn.addEventListener("click", prevSlide);

        carousel.addEventListener("mouseenter", stopAutoSlide);
        carousel.addEventListener("mouseleave", startAutoSlide);

        updateCarousel();
        startAutoSlide();
    };

    initCarousel();

    // =====================================
    // FILTROS DE CONTEXTO
    // =====================================
    const filtros = document.querySelectorAll(".filtros-contexto button");

    filtros.forEach(btn => {
        btn.addEventListener("click", () => {
            const isActive = btn.getAttribute("aria-pressed") === "true";
            filtros.forEach(b => b.setAttribute("aria-pressed", "false"));
            btn.setAttribute("aria-pressed", String(!isActive));
            // Aquí podrías integrar filtros funcionales con lógica adicional
            console.log(`🔎 Filtro activado: ${btn.textContent}`);
        });
    });

    // =====================================
    // BOTÓN DE AYUDA FLOTANTE
    // =====================================
    const btnAyuda = document.querySelector("button.btn-info.position-fixed");

    if (btnAyuda) {
        btnAyuda.addEventListener("click", () => {
            alert("¿Necesitas ayuda? Puedes visitar la sección de contacto o escribirnos directamente.");
        });
    }

    // =====================================
    // VALIDACIÓN BÁSICA DEL BOLETÍN
    // =====================================
    const boletinForm = document.querySelector(".boletin form");

    if (boletinForm) {
        boletinForm.addEventListener("submit", (e) => {
            const emailInput = boletinForm.querySelector("input[type='email']");
            if (!emailInput.value || !emailInput.value.includes("@")) {
                e.preventDefault();
                alert("Por favor, introduce un correo electrónico válido.");
                emailInput.focus();
            }
        });
    }
});