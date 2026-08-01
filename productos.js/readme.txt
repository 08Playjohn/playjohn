// CONFIGURACIÓN DE LAS 7 CONSOLAS Y SUS JUEGOS
const baseDeDatos = [
    {
        id: "ps2",
        titulo: "🎮 PlayStation 2",
        color: "#00f0ff",
        juegos: [
            { nombre: "GTA San Andreas (PS2)", precio: 5000, desc: "Un clásico absoluto. Revive la historia de CJ en Los Santos.", img: "Imagenes/gta san andreas ps2.jpg", tag: "DISPONIBLE" }
        ]
    },
    {
        id: "ps3",
        titulo: "🎮 PlayStation 3",
        color: "#00f0ff",
        juegos: [
            { nombre: "GTA V (PS3)", precio: 12000, desc: "Los inicios del multijugador y una campaña inolvidable.", img: "Imagenes/gta v ps3.jpg", tag: "DISPONIBLE" }
        ]
    },
    {
        id: "ps4",
        titulo: "🎮 PlayStation 4",
        color: "#00f0ff",
        juegos: [
            { nombre: "Spider-Man (PS4)", precio: 35000, desc: "Recorre Nueva York balanceándote con la mejor acción de Marvel.", img: "Imagenes/spider-man ps4.jpg", tag: "DISPONIBLE" }
        ]
    },
    {
        id: "ps5",
        titulo: "🎮 PlayStation 5",
        color: "#00f0ff",
        juegos: [
            { nombre: "GTA V (PS5)", precio: 75000, desc: "VEMOS ACA LUEGO QUE PONEMOS SOY LA MEJOR.", img: "Imagenes/gta v ps5.jpg", tag: "PROMOCION" }
        ]
    },
    {
        id: "xbox-360",
        titulo: "🟢 Xbox 360",
        color: "#39ff14",
        juegos: [
            { nombre: "Halo 4 (Xbox 360)", precio: 10000, desc: "El regreso del Jefe Maestro en una de las mejores joyas de la consola.", img: "Imagenes/halo 4 xbox360.jpg", tag: "DISPONIBLE" }
        ]
    },
    {
        id: "xbox-series",
        titulo: "🟢 Xbox Series X / S",
        color: "#39ff14",
        juegos: [
            { nombre: "Forza Horizon 5 (Xbox Series)", precio: 80000, desc: "Carreras brutales en gráficos de nueva generación.", img: "Imagenes/forza horizon 5 xbox.jpg", tag: "DISPONIBLE" }
        ]
    },
    {
        id: "nintendo-switch",
        titulo: "🔴 Nintendo Switch",
        color: "#ff003c",
        juegos: [
            { nombre: "Mario Kart 8 Deluxe (Switch)", precio: 65000, desc: "Diversión asegurada para jugar con amigos de forma portátil.", img: "Imagenes/mario kart switch.jpg", tag: "DISPONIBLE" }
        ]
    }
];

// RENDERIZADO AUTOMÁTICO EN LA WEB
const contenedorProductos = document.getElementById('catalogo-consolas');
const contenedorSubmenu = document.getElementById('submenu-consolas');

if (contenedorProductos && contenedorSubmenu) {
    baseDeDatos.forEach(consola => {
        // Render submenú
        const link = document.createElement('a');
        link.href = `#${consola.id}`;
        link.style.cssText = `color: ${consola.color}; text-decoration: none; font-size: 0.85rem; font-weight: bold; border: 1px solid ${consola.color}; padding: 5px 12px; border-radius: 4px;`;
        link.innerText = consola.id.toUpperCase().replace('-', ' ');
        contenedorSubmenu.appendChild(link);

        // Render Categoría y Juegos
        const seccion = document.createElement('div');
        seccion.id = consola.id;
        seccion.style.scrollMarginTop = "20px";
        
        let tarjetasHTML = '';
        consola.juegos.forEach(juego => {
            tarjetasHTML += `
                <div class="tarjeta-juego">
                    <img src="${juego.img}" alt="${juego.nombre}" class="foto-juego">
                    <h3>${juego.nombre}</h3>
                    <p class="descripcion">${juego.desc}</p>
                    <div class="precio">$${juego.precio.toLocaleString('es-AR')}</div>
                    <span class="badge disponible" style="margin-bottom: 15px;">${juego.tag}</span>
                    <button class="boton-wpp btn-agregar-carrito" data-nombre="${juego.nombre}" data-precio="${juego.precio}" style="width: 100% !important; padding: 10px !important; font-size: 0.9rem !important; border: none; cursor: pointer;"><i class="fa-solid fa-cart-plus" style="margin-right: 8px;"></i> Comprar</button>
                </div>
            `;
        });

        seccion.innerHTML = `
            <h2 style="color: ${consola.color}; text-align: center; font-size: 1.8rem; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 30px; text-shadow: 0 0 10px ${consola.color}; font-family: sans-serif;">${consola.titulo}</h2>
            <div class="contenedor-catalogo" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 30px; max-width: 1200px; margin: 0 auto;">
                ${tarjetasHTML}
            </div>
        `;
        contenedorProductos.appendChild(seccion);
    });
}

// LÓGICA DE FUNCIONAMIENTO DEL CARRITO
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

document.body.addEventListener('click', (e) => {
    const boton = e.target.closest('.btn-agregar-carrito');
    if (boton) {
        const nombre = boton.getAttribute('data-nombre');
        const precio = parseFloat(boton.getAttribute('data-precio'));
        const existe = carrito.find(item => item.nombre === nombre);
        if(existe) { existe.cantidad++; } else { carrito.push({ nombre, precio, cantidad: 1 }); }
        actualizarCarrito();
        if (ventanaCarrito) ventanaCarrito.style.right = '0';
    }
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
        window.open("https://wa.link/b336q6" + encodeURIComponent(mensaje), '_blank');
    });
}

actualizarCarrito();
