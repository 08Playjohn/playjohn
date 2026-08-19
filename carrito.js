// ============================================================================
// CARRITO DE COMPRAS GLOBAL Y SINCRONIZADO EN TIEMPO REAL
// ============================================================================

// Creamos o recuperamos el carrito único para TODAS las pestañas
let carrito = JSON.parse(localStorage.getItem('carrito_global')) || [];

document.addEventListener("DOMContentLoaded", function() {
    // Capturamos los elementos que existan en la página actual
    const ventanaCarrito = document.getElementById('ventana-carrito');
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    const contadorCarrito = document.getElementById('contador-carrito');

    // Selectores para abrir y cerrar (compatibles con ambas páginas)
    const btnFlotante = document.getElementById('btn-carrito-flotante');
    const btnCerrar = document.getElementById('cerrar-carrito') || document.querySelector('.cerrar-carrito');

    // 1. CONTROL DE APERTURA Y CIERRE DE LA VENTANA
    if (btnFlotante && ventanaCarrito) {
        btnFlotante.addEventListener('click', () => ventanaCarrito.style.right = '0px');
    }
    if (btnCerrar && ventanaCarrito) {
        btnCerrar.addEventListener('click', () => {
            // Se adapta si la ventana usa -400px o -100% en sus estilos
            ventanaCarrito.style.right = ventanaCarrito.style.width === '320px' ? '-100%' : '-400px';
        });
    }

    // 2. FUNCIÓN PARA REDIBUJAR LA INTERFAZ EN PANTALLA
    function actualizarInterfaz() {
        if (!listaCarrito) return;
        listaCarrito.innerHTML = '';
        let total = 0, cantidadTotal = 0;
        
        carrito.forEach((item, index) => {
            total += item.precio * item.cantidad;
            cantidadTotal += item.cantidad;
            
            const div = document.createElement('div');
            // Estilos adaptables (flexibles tanto para fondo blanco como oscuro)
            div.style.cssText = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid rgba(128,128,128,0.2); padding-bottom: 5px; font-size: 0.9rem;";
            
            // Evaluamos si la hoja actual es la de diseño oscuro o claro para el color del texto
            const esFondoOscuro = window.getComputedStyle(ventanaCarrito).backgroundColor === 'rgb(16, 18, 26)';
            div.style.color = esFondoOscuro ? '#fff' : '#10121a';

            div.innerHTML = `
                <div style="flex:1;">
                    <b>${item.nombre}</b>
                    <div>${item.cantidad} x $${item.precio.toLocaleString('es-AR')}</div>
                </div>
                <button class="btn-eliminar" data-index="${index}" style="background:none; border:none; color:#ff003c; cursor:pointer; font-size:1.2rem;">&times;</button>
            `;
            listaCarrito.appendChild(div);
        });

        if (totalCarrito) totalCarrito.textContent = `$${total.toLocaleString('es-AR')}`;
        if (contadorCarrito) contadorCarrito.textContent = cantidadTotal;
        
        // Guardamos en la "caja fuerte" común del navegador
        localStorage.setItem('carrito_global', JSON.stringify(carrito));
    }

    // 3. ESCUCHAR CAMBIOS DESDE OTRAS PESTAÑAS ABIERTAS (Sincronización en vivo)
    window.addEventListener('storage', function(e) {
        if (e.key === 'carrito_global') {
            carrito = JSON.parse(e.newValue) || [];
            actualizarInterfaz();
        }
    });

    // 4. CAPTURA DE CLICS EN BOTONES (Agregar y Eliminar)
    document.addEventListener('click', function(e) {
        // Detecta si presionamos "Agregar al carrito"
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
        
        // Detecta si presionamos la "X" para eliminar un producto
        if (e.target && e.target.classList.contains('btn-eliminar')) {
            carrito.splice(e.target.getAttribute('data-index'), 1);
            actualizarInterfaz();
        }
    });

    // 5. ENVIAR PEDIDO POR WHATSAPP (Soporta los dos botones de tus hojas)
    const btnEnviarComputacion = document.getElementById('btn-enviar-carrito');
    
    // Función contenedora del mensaje de WhatsApp
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
        window.location.assign("https://wa.me" + telefono + "?text=" + encodeURIComponent(mensaje));
    };

    // Si la hoja usa el botón con ID de la segunda parte, le asignamos la misma función
    if (btnEnviarComputacion) {
        btnEnviarComputacion.addEventListener('click', enviarPedidoWhatsApp);
    }

    // Dibujamos el estado inicial al cargar la página
    actualizarInterfaz();
});
