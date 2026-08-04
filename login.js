// REEMPLAZÁ ESTO CON LA URL LARGA QUE COPIASTE EN EL PASO 1 (NUEVA IMPLEMENTACIÓN)
const URL_GOOGLE_SCRIPT = https://script.google.com/macros/s/AKfycbwqPdUzWDOJAtaputLJC2ebosxGuLkrkBxOFQu08PxvhenV3iUEcYYV2hGLdhJl5-Kx/exec;

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // INTERACTIVIDAD DE LOS BOTONES VISUALES
    // ==========================================
    const btnMostrar = document.getElementById("btn-mostrar-login");
    const seccionFormularios = document.getElementById("seccion-formularios");
    const saludo = document.getElementById("usuario-saludo");

    // Si el usuario ya se había logueado antes, lo saludamos automáticamente
    const usuarioGuardado = localStorage.getItem("usuarioLogueado");
    if (usuarioGuardado && saludo) {
        saludo.innerText = "👋 ¡Hola, " + usuarioGuardado + "! Ya estás conectado.";
        saludo.style.display = "block";
        if (btnMostrar) btnMostrar.innerText = "Cerrar Sesión";
    }

    if (btnMostrar && seccionFormularios) {
        btnMostrar.addEventListener("click", () => {
            if (localStorage.getItem("usuarioLogueado")) {
                // Si hace clic teniendo sesión activa, funciona como botón de Logout
                localStorage.removeItem("usuarioLogueado");
                if (saludo) saludo.style.display = "none";
                btnMostrar.innerText = "🔑 Iniciar Sesión / Registrarse";
                alert("Sesión cerrada correctamente.");
                window.location.reload();
            } else {
                // Si no está logueado, abre y cierra el panel de entrada
                if (seccionFormularios.style.display === "none" || seccionFormularios.style.display === "") {
                    seccionFormularios.style.display = "block";
                } else {
                    seccionFormularios.style.display = "none";
                }
            }
        });
    }

    // ==========================================
    // 1. CÓDIGO PARA EL BOTÓN INICIAR SESIÓN (Sigue igual abajo...)
    // ==========================================
    
    // ==========================================
    // 1. CODIGO PARA EL BOTÓN INICIAR SESIÓN
    // ==========================================
    const formLogin = document.getElementById("formulario-login"); // Cambialo por el ID de tu form de login
    if (formLogin) {
        formLogin.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById("login-email").value;
            const passwordInput = document.getElementById("login-password").value;
            
            const datosLogin = {
                accion: "login",
                email: emailInput,
                password: passwordInput
            };
            
            fetch(URL_GOOGLE_SCRIPT, {
                method: "POST",
                headers: { "Content-Type": "text/plain" }, // Usar text/plain evita bloqueos de CORS entre servidores
                body: JSON.stringify(datosLogin)
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    alert("¡Bienvenido/a de nuevo " + data.nombre + "!");
                    // Acá podés guardar el nombre en el navegador para saludarlo en la barra superior:
                    localStorage.setItem("usuarioLogueado", data.nombre);
                    window.location.href = "productos.html"; // Lo redirige al catálogo automáticamente
                } else {
                    alert("Error: " + data.message);
                }
            })
            .catch(error => {
                alert("Hubo un fallo en la conexión con el servidor.");
                console.error(error);
            });
        });
    }

    // ==========================================
    // 2. CODIGO PARA EL FORMULARIO DE REGISTRO
    // ==========================================
    const formRegistro = document.getElementById("formulario-registro");
    if (formRegistro) {
        formRegistro.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const datosRegistro = {
                accion: "registro",
                nombre: document.getElementById("reg-nombre").value,
                telefono: document.getElementById("reg-telefono").value,
                direccion: document.getElementById("reg-direccion").value,
                email: document.getElementById("reg-email").value,
                password: document.getElementById("reg-password").value
            };
            
            fetch(URL_GOOGLE_SCRIPT, {
                method: "POST",
                headers: { "Content-Type": "text/plain" },
                body: JSON.stringify(datosRegistro)
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    alert("¡Tu cuenta fue creada con éxito! Ya podés ingresar.");
                    formRegistro.reset();
                    // Acá podés meter el código para cerrar el modal de registro y abrir el de login
                } else {
                    alert("No se pudo registrar: " + data.message);
                }
            })
            .catch(error => {
                alert("Ocurrió un error en el registro.");
                console.error(error);
            });
        });
    }
});
