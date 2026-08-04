// REEMPLAZÁ ESTO CON LA URL LARGA QUE COPIASTE EN EL PASO 1 (NUEVA IMPLEMENTACIÓN)
const URL_GOOGLE_SCRIPT = "https://script.google.com/macros/s/AKfycbwqPdUzWDOJAtaputLJC2ebosxGuLkrkBxOFQu08PxvhenV3iUEcYYV2hGLdhJl5-Kx/exec";

document.addEventListener("DOMContentLoaded", () => {
    
  
    const btnMostrar = document.getElementById("btn-mostrar-login");
    const seccionFormularios = document.getElementById("seccion-formularios");
    const saludo = document.getElementById("usuario-saludo");
    const formLogin = document.getElementById("formulario-login");
    const formRegistro = document.getElementById("formulario-registro");

    // Verificar si el usuario ya inició sesión antes
    const usuarioGuardado = localStorage.getItem("usuarioLogueado");
    if (usuarioGuardado && saludo && btnMostrar) {
        saludo.innerText = "👋 ¡Hola, " + usuarioGuardado + "! Ya estás conectado.";
        saludo.style.display = "block";
        btnMostrar.innerText = "Cerrar Sesión";
        btnMostrar.style.backgroundColor = "#ff003c";
    }

    // Desplegar o cerrar el panel
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

    // ==========================================
    // 1. CÓDIGO PARA EL BOTÓN INICIAR SESIÓN
    // ==========================================
    if (formLogin) {
        formLogin.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const datosLogin = {
                accion: "login",
                email: document.getElementById("login-email").value.trim(),
                password: document.getElementById("login-password").value.trim()
            };
            
            // Empaquetamos en formato compatible para Google Apps Script
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
                    alert("¡Ingreso correcto! Bienvenido/a.");
                    localStorage.setItem("usuarioLogueado", data.nombre);
                    window.location.reload();
                } else {
                    alert("Atención: " + data.message);
                }
            })
            .catch(error => {
                alert("Error de credenciales. Verifica si el usuario existe en tu Drive.");
                console.error(error);
            });
        });
    }

    // ==========================================
    // 2. CÓDIGO PARA EL FORMULARIO DE REGISTRO
    // ==========================================
    if (formRegistro) {
        formRegistro.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const datosRegistro = {
                accion: "registro",
                nombre: document.getElementById("reg-nombre").value.trim(),
                telefono: document.getElementById("reg-telefono").value.trim(),
                direccion: document.getElementById("reg-direccion").value.trim(),
                email: document.getElementById("reg-email").value.trim(),
                password: document.getElementById("reg-password").value.trim()
            };
            
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
                    alert("¡Cuenta creada con éxito! Ya podés iniciar sesión.");
                    formRegistro.reset();
                    window.location.reload();
                } else {
                    alert("No se pudo registrar: " + data.message);
                }
            })
            .catch(error => {
                // Parche por desvío de seguridad de Drive
                alert("Proceso de registro enviado. Revisá tu planilla de Drive.");
                formRegistro.reset();
            });
        });
    }
});
