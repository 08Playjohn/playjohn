// ============================================================================
// CARRITO DE COMPRAS GLOBAL Y SINCRONIZADO EN TIEMPO REAL - SEGURO CONTRA ERRORES
// ============================================================================

// Recuperamos o inicializamos el carrito único para todas las páginas
let carrito = JSON.parse(localStorage.getItem('carrito_global')) || [];

document.addEventListener("DOMContentLoaded", function() {
    // 1. FUNCIÓN PARA REDIBUJAR LA INTERFAZ EN LA PANTALLA ACTUAL
    function actualizarInterfaz() {
        const listaCarrito = document.getElementById('lista-carrito');
        const totalCarrito = document.getElementById('total-carrito');
        const contadorCarrito = document.getElementById('contador-carrito');
        const ventanaCarrito = document.getElementById('ventana-carrito');

        if (!listaCarrito) return;
        listaCarrito.innerHTML = '';
        let total = 0, cantidadTotal = 0;
        
        carrito.forEach((item, index) => {
            total += item.precio * item.cantidad;
            cantidadTotal += item.cantidad;
            
            const div = document.createElement('div');
            div.style.cssText = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid rgba(128,128,128,0.2); padding-bottom: 5px; font-size: 0.9rem;";
            
            // Evaluamos dinámicamente si la ventana de la página actual es de fondo oscuro o claro
            if (ventanaCarrito) {
                const esFondoOscuro = window.getComputedStyle(ventanaCarrito).backgroundColor === 'rgb(16, 18, 26)';
                div.style.color = esFondoOscuro ? '#fff' : '#10121a';
            }

            div.innerHTML = `
                <div style="flex:1;">
                    <b style="color: inherit;">${item.nombre}</b>
                    <div style="color: inherit; opacity: 0.8;">${item.cantidad} x $${item.precio.toLocaleString('es-AR')}</div>
                </div>
                <button class="btn-eliminar" data-index="${index}" style="background:none; border:none; color:#ff003c; cursor:pointer; font-size:1.2rem;">&times;</button>
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
        // Evento Agregar Producto al Carrito
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
        
        // Evento Eliminar Producto Individual
        if (e.target && e.target.classList.contains('btn-eliminar')) {
            carrito.splice(e.target.getAttribute('data-index'), 1);
            actualizarInterfaz();
        }
    });

    // 4. ESCUCHAR CAMBIOS DESDE OTRAS PESTAÑAS (Sincronización instantánea)
    window.addEventListener('storage', function(e) {
        if (e.key === 'carrito_global') {
            carrito = JSON.parse(e.newValue) || [];
            actualizarInterfaz();
        }
    });

    // 5. ENVIAR PEDIDO POR WHATSAPP (Aislado de forma segura)
    const btnEnviarCarrito = document.getElementById('btn-enviar-carrito');
    
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

    if (btnEnviarCarrito) {
        btnEnviarCarrito.addEventListener('click', enviarPedidoWhatsApp);
    }

    // 6. LÓGICA DE VACIADO DEL CARRITO COMPLETO (Aislado de forma segura)
    const btnVaciarHtml = document.getElementById('btn-vaciar-carrito');
    if (btnVaciarHtml) {
        btnVaciarHtml.addEventListener('click', function() {
            if (confirm("¿Estás seguro de que querés vaciar todo el carrito?")) {
                carrito = []; 
                actualizarInterfaz(); 
            }
        });
    }

    // Dibujamos el estado inicial al cargar la página actual
    actualizarInterfaz();
});
