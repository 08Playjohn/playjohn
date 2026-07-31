let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const btnFlotante = document.getElementById('btn-carrito-flotante');
const ventanaCarrito = document.getElementById('ventana-carrito');
const btnCerrar = document.getElementById('cerrar-carrito');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const contadorCarrito = document.getElementById('contador-carrito');
const btnEnviar = document.getElementById('enviar-pedido');

if (btnFlotante && ventanaCarrito && btnCerrar) {
    btnFlotante.addEventListener('click', () => ventanaCarrito.style.right = '0');
    btnCerrar.addEventListener('click', () => ventanaCarrito.style.right = '-400px');
}

document.querySelectorAll('.btn-agregar-carrito').forEach(boton => {
    boton.addEventListener('click', () => {
        const nombre = boton.getAttribute('data-nombre');
        const precio = parseFloat(boton.getAttribute('data-precio'));
        const existe = carrito.find(item => item.nombre === nombre);
        if(existe) { existe.cantidad++; } else { carrito.push({ nombre, precio, cantidad: 1 }); }
        actualizarCarrito();
        if (ventanaCarrito) ventanaCarrito.style.right = '0';
    });
});

window.eliminarProducto = function(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    actualizarCarrito();
}

function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    if (!listaCarrito || !totalCarrito || !contadorCarrito) return;
    
    listaCarrito.innerHTML = '';
    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        cantidadTotal += item.cantidad;
        const elemento = document.createElement('div');
        elemento.style.cssText = "display:flex; justify-content:space-between; align-items:center; background-color:#161925; padding:10px; border-radius:6px; margin-bottom:10px; border:1px solid #3a3f58;";
        elemento.innerHTML = `
            <div style="color: #fff; font-size: 0.9rem; text-align: left;">
                <div style="font-weight: bold;">${item.nombre}</div>
                <div style="color: #39ff14;">$${(item.precio * item.cantidad).toLocaleString('es-AR')} (x${item.cantidad})</div>
            </div>
            <button onclick="eliminarProducto('${item.nombre}')" style="background:none; border:none; color:#ff003c; font-size:1.1rem; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>
        `;
        listaCarrito.appendChild(elemento);
    });

    totalCarrito.innerText = `$${total.toLocaleString('es-AR')}`;
    contadorCarrito.innerText = cantidadTotal;
}

if (btnEnviar) {
    btnEnviar.addEventListener('click', () => {
        if(carrito.length === 0) { alert('El carrito está vacío.'); return; }
        let mensaje = "¡Hola Play John! Quiero realizar el siguiente pedido:\n\n";
        carrito.forEach(item => { mensaje += `• ${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toLocaleString('es-AR')}\n`; });
        mensaje += `\n*Total estimado: ${totalCarrito.innerText}*`;
        window.open(`https://wa.me{encodeURIComponent(mensaje)}`, '_blank');
    });
}

actualizarCarrito();
