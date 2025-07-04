document.addEventListener("DOMContentLoaded", () => {
    const btnMenu = document.getElementById("nav-cel");
    const navLinks = document.getElementById("navlinks");
    const form = document.getElementById("form-contacto");
    const confirmMsg = document.getElementById("mensaje-confirmacion");

    // === MENÚ MÓVIL ===
    if (btnMenu && navLinks) {
        const toggleMenu = () => {
            const isOpen = navLinks.classList.toggle("active");
            btnMenu.classList.toggle("active", isOpen);
            btnMenu.setAttribute("aria-expanded", isOpen);
            btnMenu.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
        };

        const closeMenu = () => {
            if (navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                btnMenu.classList.remove("active");
                btnMenu.setAttribute("aria-expanded", "false");
                btnMenu.setAttribute("aria-label", "Abrir menú");
            }
        };

        btnMenu.addEventListener("click", toggleMenu);

        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !btnMenu.contains(e.target)) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                closeMenu();
                btnMenu.focus();
            }
        });
    }

    // === FORMULARIO ===
    if (form && confirmMsg) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const contenido = document.getElementById("contenido").value.trim();
            const categoria = document.getElementById("categoria").value;
            const consentimiento = document.getElementById("consentimiento").checked;
            const telefono = document.getElementById("telefono").value.trim();

            // Validación básica del contenido
            if (!contenido) {
                alert("Por favor, describe el rumor, teoría o información.");
                document.getElementById("contenido").focus();
                return;
            }

            // Validación de categoría
            if (!categoria) {
                alert("Por favor, selecciona una categoría.");
                document.getElementById("categoria").focus();
                return;
            }

            // Validación del checkbox
            if (!consentimiento) {
                alert("Debes aceptar que tu aporte sea analizado.");
                document.getElementById("consentimiento").focus();
                return;
            }

            // Validación opcional de teléfono si se completa
            if (telefono && !/^[\d+\s()-]{6,20}$/.test(telefono)) {
                alert("Por favor, introduce un teléfono válido o déjalo en blanco.");
                document.getElementById("telefono").focus();
                return;
            }

            // Simulación de envío
            confirmMsg.textContent = "¡Gracias por tu aporte! Lo revisaremos pronto.";
            confirmMsg.classList.remove("oculto");

            // Opcional: Ocultar el mensaje después de unos segundos
            setTimeout(() => {
                confirmMsg.classList.add("oculto");
            }, 6000);

            form.reset();
        });
    }
});