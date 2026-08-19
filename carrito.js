// ============================================================================
// CARRITO DE COMPRAS GLOBAL Y SINCRONIZADO EN TIEMPO REAL - VERSIÓN FINAL FIX
// ============================================================================

// Recuperamos o inicializamos el carrito único para todas las páginas
let carrito = JSON.parse(localStorage.getItem('carrito_global')) || [];

// Definimos la función de WhatsApp GLOBAL para que responda siempre
window.enviarPedidoWhatsApp = function() {
    if (carrito.length === 0) return alert("Tu carrito está vacío.");
    
    let mensaje = "¡Hola! Quiero realizar el siguiente pedido unificado:\n\n";
    let total = 0;
    carrito.forEach(function(item) {
        mensaje += "- " + item.cantidad + "x " + item.nombre + " ($" + (item.precio * item.cantidad).toLocaleString('es-AR') + ")\n";
        total += item.precio * item.cantidad;
    });
    mensaje += "\n*Total: $" + total.toLocaleString('es-AR') + "*";
    
    const telefono = "5491141701483"; 
    const urlFinal = "https://whatsapp.com" + telefono + "&text=" + encodeURIComponent(mensaje);
    window.location.assign(urlFinal);
};

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. FUNCIÓN PARA REDIBUJAR LA INTERFAZ EN LA PANTALLA ACTUAL
    function actualizarInterfaz() {
        const listaCarrito = document.getElementById('lista-carrito');
        const totalCarrito = document.getElementById('total-carrito');
        const contadorCarrito = document.getElementById('contador-carrito');

        if (!listaCarrito) return;
        listaCarrito.innerHTML = '';
        let total = 0, cantidadTotal = 0;

        carrito.forEach((item, index) => {
            total += item.precio * item.cantidad;
            cantidadTotal += item.cantidad;
            
            const div = document.createElement('div');
            // Diseñamos una pequeña tarjeta interna oscura con letras blancas ultra legible para todas las hojas
            div.style.cssText = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 8px; font-size: 0.9rem; background-color: #1a1d29; border-radius: 4px; color: #fff !important;";

            div.innerHTML = `
                <div style="flex:1; color: #fff !important;">
                    <b style="color: #fff !important; display: block; margin-bottom: 3px;">${item.nombre}</b>
                    <div style="color: #39ff14 !important; font-weight: bold;">${item.cantidad} x $${item.precio.toLocaleString('es-AR')}</div>
                </div>
                <button class="btn-eliminar" data-index="${index}" style="background:none; border:none; color:#ff003c !important; cursor:pointer; font-size:1.4rem; padding: 0 5px;">&times;</button>
            `;
            listaCarrito.appendChild(div);
        });

        if (totalCarrito) totalCarrito.textContent = `$${total.toLocaleString('es-AR')}`;
        if (contadorCarrito) contadorCarrito.textContent = cantidadTotal;
        
        // Sincronizamos con la memoria global del navegador
        localStorage.setItem('carrito_global', JSON.stringify(carrito));
    }

    // 2. CONTROL DE APERTURA Y CIERRE DE LA VENTANA LATERAL
    const btnFlotante = document.getElementById('btn-carrito-flotante');
    const btnNavbar = document.getElementById('btn-carrito-navbar');
    const btnCerrar = document.getElementById('cerrar-carrito') || document.querySelector('.cerrar-carrito');
    const ventanaCarrito = document.getElementById('ventana-carrito');

    if (btnFlotante && ventanaCarrito) {
        btnFlotante.addEventListener('click', () => ventanaCarrito.style.right = '0px');
    }
    
    if (btnNavbar && ventanaCarrito) {
        btnNavbar.addEventListener('click', function(e) {
            e.preventDefault();
            ventanaCarrito.style.right = '0px';
        });
    }

    if (btnCerrar && ventanaCarrito) {
        btnCerrar.addEventListener('click', () => {
            ventanaCarrito.style.right = ventanaCarrito.style.width === '320px' ? '-100%' : '-400px';
        });
    }

    // 3. CAPTURA DE CLICS GLOBAL (Agregar y Eliminar Productos)
    document.addEventListener('click', function(e) {
        if (e.target && (e.target.classList.contains('btn-agregar-carrito') || e.target.closest('.btn-agregar-carrito'))) {
            let targetButton = e.target.classList.contains('btn-agregar-carrito') ? e.target : e.target.closest('.btn-agregar-carrito');
            const nombre = targetButton.getAttribute('data-nombre');
            const precio = parseFloat(targetButton.getAttribute('data-precio'));
            const existe = carrito.find(item => item.nombre === nombre);
            
            if (existe) {
                existe.cantidad++; 
            } else { 
                carrito.push({ nombre: nombre, precio: precio, cantidad: 1 }); 
            }
            actualizarInterfaz();
            if (ventanaCarrito) ventanaCarrito.style.right = '0px';
        }
        
        if (e.target && e.target.classList.contains('btn-eliminar')) {
            carrito.splice(e.target.getAttribute('data-index'), 1);
            actualizarInterfaz();
        }
    });

    // 4. ESCUCHAR CAMBIOS DESDE OTRAS PESTAÑAS
    window.addEventListener('storage', function(e) {
        if (e.key === 'carrito_global') {
            carrito = JSON.parse(e.newValue) || [];
            actualizarInterfaz();
        }
    });

    // 5. ENLAZAR BOTÓN DE ENVIAR (Doble compatibilidad)
    const btnEnviarCarrito = document.getElementById('btn-enviar-carrito');
    if (btnEnviarCarrito) {
        btnEnviarCarrito.addEventListener('click', enviarPedidoWhatsApp);
    }

    // 6. LÓGICA DE VACIADO DEL CARRITO COMPLETO
    const btnVaciarHtml = document.getElementById('btn-vaciar-carrito');
    if (btnVaciarHtml) {
        btnVaciarHtml.addEventListener('click', function() {
            if (confirm("¿Estás seguro de que querés vaciar todo el carrito?")) {
                carrito = []; 
                actualizarInterfaz(); 
            }
        });
    }

    // Dibujamos el estado inicial al cargar la página
    actualizarInterfaz();
});
