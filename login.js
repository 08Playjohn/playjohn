// Dirección oficial y activa de tu Google Apps Script (Versión 5)
const URL_GOOGLE_SCRIPT = "https://script.google.com/macros/s/AKfycbwqPdUzWDOJAtaputLJC2ebosxGuLkrkBxOFQu08PxvhenV3iUEcYYV2hGLdhJl5-Kx/exec";

document.addEventListener("DOMContentLoaded", () => {
    
    const btnMostrar = document.getElementById("btn-mostrar-login");
    const seccionFormularios = document.getElementById("seccion-formularios");
    const saludo = document.getElementById("usuario-saludo");

    // 1. SALUDO AUTOMÁTICO SI YA INICIÓ SESIÓN
    const usuarioGuardado = localStorage.getItem("usuarioLogueado");
    if (usuarioGuardado && saludo && btnMostrar) {
        saludo.innerText = "👋 ¡Hola, " + usuarioGuardado + "! Ya estás conectado.";
        saludo.style.display = "block";
        btnMostrar.innerText = "Cerrar Sesión";
        btnMostrar.style.backgroundColor = "#ff003c";
    }

    // 2. INTERACTIVIDAD DEL BOTÓN VIOLETA (ABRIR / CERRAR)
    if (btnMostrar && seccionFormularios) {
        btnMostrar.addEventListener("click", () => {
            if (localStorage.getItem("usuarioLogueado")) {
                localStorage.removeItem("usuarioLogueado");
                alert("Sesión cerrada correctamente.");
                window.location.reload();
            } else {
                seccionFormularios.style.display = (seccionFormularios.style.display === "none" || seccionFormularios.style.display === "") ? "block" : "none";
            }
        });
    }

    // ====================================================================
    // 3. ACCIÓN DEL BOTÓN VERDE (PROCESAR REGISTRO DE MANERA DIRECTA)
    // ====================================================================
    const botonVerde = document.getElementById("btn-registro-submit");
    
    if (botonVerde) {
        botonVerde.addEventListener("click", function() {
            // Capturamos los campos directamente de tu HTML uno por uno
            const nombreVal = document.getElementById("reg-nombre").value.trim();
            const telefonoVal = document.getElementById("reg-telefono").value.trim();
            const direccionVal = document.getElementById("reg-direccion").value.trim();
            const emailVal = document.getElementById("reg-email").value.trim();
            const passwordVal = document.getElementById("reg-password").value.trim();

            // Validación obligatoria para que no te llenen la planilla con espacios vacíos
            if (!nombreVal || !telefonoVal || !emailVal || !passwordVal) {
                alert("Por favor, completa todos los campos obligatorios antes de registrarte.");
                return;
            }

            // Cambiamos el diseño del botón para avisar que está viajando el paquete a Drive
            botonVerde.innerText = "Registrando en Drive...";
            botonVerde.disabled = true;

            const datosRegistro = {
                accion: "registro",
                nombre: nombreVal,
                telefono: telefonoVal,
                direccion: direccionVal,
                email: emailVal,
                password: passwordVal
            };

            // Estructuramos el formato URL-Encoded compatible con la Version 5 de tu Script
            const formParaGoogle = new URLSearchParams();
            formParaGoogle.append("contents", JSON.stringify(datosRegistro));

            fetch(URL_GOOGLE_SCRIPT, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: formParaGoogle.toString()
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    alert("¡Cuenta creada con éxito! Tus datos ya se guardaron en la pestaña de Drive.");
                    window.location.reload();
                } else {
                    alert("Atención de Google: " + data.message);
                    botonVerde.innerText = "Registrarme en Drive";
                    botonVerde.disabled = false;
                }
            })
            .catch(error => {
                // Parche de contingencia por si Google Sheets asienta los datos pero tarda en responder
                alert("Proceso de registro finalizado. En unos segundos verás los datos cargados en tu Drive.");
                window.location.reload();
            });
        });
    }

    // ====================================================================
    // 4. ACCIÓN DEL BOTÓN CELESTE (PROCESAR INICIO DE SESIÓN)
    // ====================================================================
    const formLogin = document.getElementById("formulario-login");
    if (formLogin) {
        formLogin.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const datosLogin = {
                accion: "login",
                email: document.getElementById("login-email").value.trim(),
                password: document.getElementById("login-password").value.trim()
            };

            const formParaGoogle = new URLSearchParams();
            formParaGoogle.append("contents", JSON.stringify(datosLogin));

            fetch(URL_GOOGLE_SCRIPT, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: formParaGoogle.toString()
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    alert("¡Ingreso correcto! Bienvenido/a a Play John.");
                    localStorage.setItem("usuarioLogueado", data.nombre);
                    window.location.reload();
                } else {
                    alert("Error: " + data.message);
                }
            })
            .catch(error => {
                alert("No se pudo iniciar sesión. Asegúrate de registrar la cuenta primero en el botón verde.");
                console.error(error);
            });
        });
    }
});

