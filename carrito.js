// carrito.js - Gestión unificada del carrito para Play John

// 1. Inicializar el carrito leyendo la memoria del navegador del cliente
let carrito = JSON.parse(localStorage.getItem('carrito_playjohn')) || [];

// 2. Elementos de la interfaz (se buscan automáticamente en la página que esté abierta)
const listaCarritoElemento = document.getElementById('lista-carrito'); // Contenedor interno donde se listan los productos agregados
const totalCarritoElemento = document.getElementById('total-carrito'); // Texto del precio total
const ventanaCarrito = document.getElementById('ventana-carrito');     // El panel lateral del carrito

// 3. Función para actualizar la visual del carrito en pantalla
function actualizarInterfaz() {
    if (!listaCarritoElemento || !totalCarritoElemento) return;

    listaCarritoElemento.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;
        listaCarritoElemento.innerHTML += `
            <div class="item-carrito" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; color: #10121a; padding: 5px; border-bottom: 1px solid #ddd;">
                <div>
                    <strong style="font-size: 0.9rem; text-transform: uppercase;">${item.nombre}</strong><br>
                    <span style="color: #666;">$${item.precio.toLocaleString('es-AR')} x ${item.cantidad}</span>
                </div>
                <button class="btn-eliminar" data-index="${index}" style="background-color: #ff4d4d; color: white; border: none; border-radius: 4px; padding: 4px 8px; cursor: pointer;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    });

    totalCarritoElemento.innerText = `$${total.toLocaleString('es-AR')}`;
}

// 4. Oyente global de clics para capturar botones en cualquier parte de la web
document.addEventListener('click', function(e) {
    // Detectar botón "Agregar al Carrito"
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
        
        localStorage.setItem('carrito_playjohn', JSON.stringify(carrito));
        actualizarInterfaz();
        
        if (ventanaCarrito) ventanaCarrito.style.right = '0px'; // Abre el panel lateral al agregar
    }
    
    // Detectar botón "Eliminar" del carrito
    if (e.target && e.target.classList.contains('btn-eliminar')) {
        const index = e.target.getAttribute('data-index');
        carrito.splice(index, 1);
        
        localStorage.setItem('carrito_playjohn', JSON.stringify(carrito));
        actualizarInterfaz();
    }

    // Botón para cerrar el carrito manualmente (por si tenés una cruz 'X')
    if (e.target && e.target.classList.contains('cerrar-carrito')) {
        if (ventanaCarrito) ventanaCarrito.style.right = '-100%';
    }
});

// Función para el botón de "Enviar Pedido por WhatsApp"
function enviarPedidoWhatsApp() {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    let texto = "¡Hola Play John! Quiero realizar el siguiente pedido:\n\n";
    let total = 0;
    
    carrito.forEach(item => {
        texto += `• ${item.nombre} (x${item.cantidad}) - $${(item.precio * item.cantidad).toLocaleString('es-AR')}\n`;
        total += item.precio * item.cantidad;
    });
    
    texto += `\n*Total a pagar: $${total.toLocaleString('es-AR')}*`;
    
    // REEMPLAZÁ CON TU NÚMERO REAL DE WHATSAPP (código de país + número sin el +)
    const numeroTel = "54941701483"; 
    const urlWhatsapp = `https://wa.me/5491141701483?text=${encodeURIComponent(texto)}`;
    
    // Limpiamos el carrito local del cliente para la próxima compra
    carrito = [];
    localStorage.removeItem('carrito_playjohn');
    actualizarInterfaz();
    
    // Abrir WhatsApp
    window.open(urlWhatsapp, '_blank');
}

// Dibujar el carrito guardado apenas cargue la página actual
document.addEventListener("DOMContentLoaded", actualizarInterfaz);
