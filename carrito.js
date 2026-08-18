// carrito.js - Gestión unificada del carrito para Play John

let carrito = JSON.parse(localStorage.getItem('carrito_global')) || [];
const btnFlotante = document.getElementById('btn-carrito-flotante');
const ventanaCarrito = document.getElementById('ventana-carrito');
const btnCerrar = document.getElementById('cerrar-carrito');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const contadorCarrito = document.getElementById('contador-carrito');
const btnEnviar = document.getElementById('btn-enviar-carrito');

if (btnFlotante && ventanaCarrito && btnCerrar) {
    btnFlotante.addEventListener('click', () => ventanaCarrito.style.right = '0px');
    btnCerrar.addEventListener('click', () => ventanaCarrito.style.right = '-400px');
}

function actualizarInterfaz() {
    if (!listaCarrito || !totalCarrito || !contadorCarrito) return;
    listaCarrito.innerHTML = '';
    let total = 0, cantidadTotal = 0;
    
    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;
        cantidadTotal += item.cantidad;
        const div = document.createElement('div');
        div.style.cssText = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; color: #fff; font-size: 0.9rem; border-bottom: 1px solid #222; padding-bottom: 5px;";
        div.innerHTML = `<div style="flex:1;"><b>${item.nombre}</b><div>${item.cantidad} x $${item.precio.toLocaleString('es-AR')}</div></div><button class="btn-eliminar" data-index="${index}" style="background:none; border:none; color:#ff003c; cursor:pointer; font-size:1.2rem;">&times;</button>`;
        listaCarrito.appendChild(div);
    });
    
    totalCarrito.textContent = `$${total.toLocaleString('es-AR')}`;
    contadorCarrito.textContent = cantidadTotal;
    localStorage.setItem('carrito_global', JSON.stringify(carrito));
}

// OYENTE GLOBAL DE CLICS (Para capturar los botones en cualquier pantalla)
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('btn-agregar-carrito')) {
        const nombre = e.target.getAttribute('data-nombre');
        const precio = parseFloat(e.target.getAttribute('data-precio'));
        
        // VOLVER A LEER EL LOCALSTORAGE ANTES DE SUMAR (Evita pisar datos de otras páginas)
        carrito = JSON.parse(localStorage.getItem('carrito_global')) || [];
        
        const existe = carrito.find(item => item.nombre === nombre);
        if (existe) existe.cantidad++; else carrito.push({ nombre, precio, quantity: 1, cantidad: 1 });
        
        actualizarInterfaz();
        if (ventanaCarrito) ventanaCarrito.style.right = '0px';
    }
    if (e.target && e.target.classList.contains('btn-eliminar')) {
        carrito = JSON.parse(localStorage.getItem('carrito_global')) || [];
        carrito.splice(e.target.getAttribute('data-index'), 1);
        actualizarInterfaz();
    }
});

if (btnEnviar) {
    btnEnviar.addEventListener('click', function() {
        if (carrito.length === 0) return alert("Tu carrito está vacío.");
        let mensaje = "¡Hola! Quiero realizar el siguiente pedido:\n\n";
        let total = 0;
        carrito.forEach(function(item) {
            mensaje += "- " + item.cantidad + "x " + item.nombre + " ($" + (item.precio * item.cantidad).toLocaleString('es-AR') + ")\n";
            total += item.precio * item.cantidad;
        });
        mensaje += "\n*Total: $" + total.toLocaleString('es-AR') + "*";
        
        // Vaciamos el carrito tras iniciar la compra
        carrito = [];
        localStorage.removeItem('carrito_global');
        actualizarInterfaz();
        
        window.location.assign("https://wa.me/5491141701483?text=" + encodeURIComponent(mensaje));
    });
}

// TRUCO CLAVE: Escucha si el almacenamiento cambió desde otra pestaña o página
window.addEventListener('storage', function(e) {
    if (e.key === 'carrito_global') {
        carrito = JSON.parse(e.newValue) || [];
        actualizarInterfaz();
    }
});

// Renderizado inicial al cargar
actualizarInterfaz();
