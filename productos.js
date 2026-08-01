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

// Escucha los clics para agregar juegos
document.querySelectorAll('.btn-agregar-carrito').forEach(boton => {
    boton.addEventListener('click', () => {
        const nombre = boton.getAttribute('data-nombre');
        const precio = parseFloat(boton.getAttribute('data-precio'));
        const existe = carrito.find(item => item.nombre === nombre);
        if(existe) { 
            existe.cantidad++; 
        } else { 
            carrito.push({ nombre, precio, cantidad: 1 }); 
        }
        actualizarCarrito();
        if (ventanaCarrito) ventanaCarrito.style.right = '0';
    });
});

// Cambiar cantidades (Sumar / Restar)
window.cambiarCantidad = function(nombre, accion) {
    const producto = carrito.find(item => item.nombre === nombre);
    if (producto) {
        if (accion === 'sumar') {
            producto.cantidad++;
        } else if (accion === 'restar') {
            producto.cantidad--;
            if (producto.cantidad <= 0) {
                carrito = carrito.filter(item => item.nombre !== nombre);
            }
        }
    }
    actualizarCarrito();
}

// Vaciar un producto completo del carrito
window.eliminarProducto = function(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    actualizarCarrito();
}

// Actualiza la lista en la persiana lateral
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
        elemento.style.cssText = "display:flex; justify-content:space-between; align-items:center; background-color:#161925; padding:12px; border-radius:6px; margin-bottom:10px; border:1px solid #3a3f58;";
        
        elemento.innerHTML = `
            <div style="color: #fff; font-size: 0.9rem; text-align: left; max-width: 65%;">
                <div style="font-weight: bold; margin-bottom: 4px;">${item.nombre}</div>
                <div style="color: #39ff14; font-weight: bold;">$${(item.precio * item.cantidad).toLocaleString('es-AR')}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
                <button onclick="cambiarCantidad('${item.nombre}', 'restar')" style="background-color: #ff003c; color: white; border: none; padding: 4px 10px; font-weight: bold; border-radius: 4px; cursor: pointer;">-</button>
                <span style="color: #fff; font-weight: bold; font-size: 0.95rem;">${item.cantidad}</span>
                <button onclick="cambiarCantidad('${item.nombre}', 'sumar')" style="background-color: #39ff14; color: black; border: none; padding: 4px 10px; font-weight: bold; border-radius: 4px; cursor: pointer;">+</button>
                <button onclick="eliminarProducto('${item.nombre}')" style="background: none; border: none; color: #ff003c; font-size: 1rem; cursor: pointer; margin-left: 4px;" title="Eliminar artículo">X</button>
            </div>
        `;
        listaCarrito.appendChild(elemento);
    });

    totalCarrito.innerText = `$${total.toLocaleString('es-AR')}`;
    contadorCarrito.innerText = cantidadTotal;
}

// Acción definitiva de Terminar Pedido por WhatsApp (Blindada sin errores)
if (btnEnviar) {
    btnEnviar.addEventListener('click', () => {
        if(carrito.length === 0) { 
            alert('El carrito está vacío.'); 
            return; 
        }
        let mensaje = "¡Hola Play John! Quiero realizar el siguiente pedido:\n\n";
        carrito.forEach(item => { 
            mensaje += "• " + item.nombre + " (x" + item.cantidad + ") - $" + (item.precio * item.cantidad).toLocaleString('es-AR') + "\n"; 
        });
        mensaje += "\n*Total estimado: " + totalCarrito.innerText + "*";
        
        // RUTA CORREGIDA CON COMILLAS TRADICIONALES TOTALMENTE ESCRITA
        window.open("https://wa.me/5491141701483" + encodeURIComponent(mensaje), "_blank");
    });
}

// Arranca el carrito al cargar la página
actualizarCarrito();

 
