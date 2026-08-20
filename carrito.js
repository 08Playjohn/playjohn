// ============================================================================
// CARRITO DE COMPRAS GLOBAL Y SINCRONIZADO EN TIEMPO REAL - CORREGIDO
// ============================================================================

let carrito = JSON.parse(localStorage.getItem('carrito_global')) || [];
window.enviarPedidoWhatsApp = function() {
    if (carrito.length === 0) return alert("Tu carrito está vacío.");
    
    let mensaje = "¡Hola! Quiero realizar el siguiente pedido:\n\n";
    let total = 0;
    carrito.forEach(function(item) {
        mensaje += "- " + item.cantidad + "x " + item.nombre + " ($" + (item.precio * item.cantidad).toLocaleString('es-AR') + ")\n";
        total += item.precio * item.cantidad;
    });
    mensaje += "\n*Total: $" + total.toLocaleString('es-AR') + "*";
    
    const telefono = "5491141701483";
    
    // CORRECCIÓN DEFINITIVA: Cambiamos a la API válida y usamos comillas invertidas (`)
    const urlFinal = `https://whatsapp.com{telefono}&text=${encodeURIComponent(mensaje)}`;
    
    window.open(urlFinal, '_blank');
};


window.enviarAlWhatsAppFinal = window.enviarPedidoWhatsApp;
  
   
document.addEventListener("DOMContentLoaded", function() {
    
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
        
        localStorage.setItem('carrito_global', JSON.stringify(carrito));
    }

    // Controles de apertura y cierre de la ventana lateral
    const btnFlotante = document.getElementById('btn-carrito-flotante');
    const btnNavbar = document.getElementById('btn-carrito-navbar');
    const btnCerrar = document.getElementById('cerrar-carrito') || document.querySelector('.cerrar-carrito');
    const ventanaCarrito = document.getElementById('ventana-carrito');

    if (btnFlotante && ventanaCarrito) btnFlotante.addEventListener('click', () => ventanaCarrito.style.right = '0px');
    if (btnNavbar && ventanaCarrito) btnNavbar.addEventListener('click', (e) => { e.preventDefault(); ventanaCarrito.style.right = '0px'; });
    if (btnCerrar && ventanaCarrito) btnCerrar.addEventListener('click', () => ventanaCarrito.style.right = ventanaCarrito.style.width === '320px' ? '-100%' : '-400px');

    // Capturar clics de forma global e independiente
    document.addEventListener('click', function(e) {
        if (e.target && (e.target.classList.contains('btn-agregar-carrito') || e.target.closest('.btn-agregar-carrito'))) {
            let targetButton = e.target.classList.contains('btn-agregar-carrito') ? e.target : e.target.closest('.btn-agregar-carrito');
            const nombre = targetButton.getAttribute('data-nombre');
            const precio = parseFloat(targetButton.getAttribute('data-precio')) || 0;
            const existe = carrito.find(item => item.nombre === nombre);
            
            if (existe) { existe.cantidad++; } else { carrito.push({ nombre: nombre, precio: precio, cantidad: 1 }); }
            actualizarInterfaz();
            if (ventanaCarrito) ventanaCarrito.style.right = '0px';
        }
        
        if (e.target && e.target.classList.contains('btn-eliminar')) {
            carrito.splice(e.target.getAttribute('data-index'), 1);
            actualizarInterfaz();
        }

        // CAPTURA EL BOTÓN QUE ESTAMOS VIENDO EN TU CAPTURA DE PANTALLA
        if (e.target && (e.target.id === 'btn-enviar-carrito' || e.target.closest('#btn-enviar-carrito'))) {
            enviarPedidoWhatsApp();
        }
    });

    window.addEventListener('storage', function(e) {
        if (e.key === 'carrito_global') {
            carrito = JSON.parse(e.newValue) || [];
            actualizarInterfaz();
        }
    });

    actualizarInterfaz();
});
