
// Tu lista centralizada de productos (Base de datos genérica)
const misProductos = [
  // ================= PLAYSTATION 2 =================
  {
    consola: "ps2",
    nombre: "GTA San Andreas (PS2)",
    imagen: "Imagenes/servicio/gta-san-andreas-ps2.jpg",
    descripcion: "Un clásico absoluto. Revive la historia de CJ en Los Santos.",
    precio: 5000,
    badge: "DISPONIBLE"
  },
  {
    consola: "ps2",
    nombre: "Joystick Inalambrico Seisa SJ-913 Azul",
    imagen: "Imagenes/servicio/Joystick_ps2_inalambrico_jpg.JPG",
    descripcion: "Control preciso, excelente ergonomía. Pilas no incluidas.",
    precio: 25000,
    badge: "DISPONIBLE"
  },

  // ================= PLAYSTATION 3 =================
  {
    consola: "ps3",
    nombre: "GTA V (PS3)",
    imagen: "Imagenes/servicio/gta-v-ps3.jpg",
    descripcion: "Los inicios del multijugador y una campaña inolvidable.",
    precio: 12000,
    badge: "DISPONIBLE"
  },

  // ================= PLAYSTATION 4 =================
  {
    consola: "ps4", 
    nombre: "Spider-Man (PS4)",
    imagen: "Imagenes/servicio/spider-man-ps4.jpg",
    descripcion: "Recorre Nueva York balanceándote con la mejor acción de Marvel.",
    precio: 35000,
    badge: "DISPONIBLE"
  },

  // ================= PLAYSTATION 5 =================
  {
    consola: "ps5",
    nombre: "GTA V (PS5)",
    imagen: "Imagenes/servicio/gta-v-ps5.jpg",
    descripcion: "Disfruta de Los Santos con mejoras visuales de nueva generación.",
    precio: 75000,
    badge: "PROMOCION"
  },

  // ================= XBOX 360 =================
  {
    consola: "xbox-360",
    nombre: "Halo 4 (Xbox 360)",
    imagen: "Imagenes/servicio/halo-4-xbox360.jpg",
    descripcion: "El regreso del Jefe Maestro en una de las mejores joyas de la consola.",
    precio: 10000,
    badge: "DISPONIBLE"
  },
  {
    consola: "xbox-360",
    nombre: "JOYSTICK XBOX360 2.4G NJX312",
    imagen: "Imagenes/servicio/joystick-xbox.jpg",
    descripcion: "Control inalámbrico de alta precisión para tu Xbox 360.",
    precio: 35000,
    badge: "DISPONIBLE"
  },

  // ================= XBOX SERIES X/S =================
  {
    consola: "xbox-series",
    nombre: "Forza Horizon 5 (Xbox Series)",
    imagen: "Imagenes/servicio/forza-horizon-5-xbox.jpg",
    descripcion: "Carreras brutales en gráficos impactantes de nueva generación.",
    precio: 80000,
    badge: "DISPONIBLE"
  },

  // ================= NINTENDO SWITCH =================
  {
    consola: "nintendo-switch",
    nombre: "The Legend of Zelda: Breath of the Wild",
    imagen: "Imagenes/servicio/zelda-switch.jpg",
    descripcion: "Una aventura de mundo abierto revolucionaria e imperdible.",
    precio: 45000,
    badge: "DISPONIBLE"
  },
  {
    consola: "nintendo-switch",
    nombre: "Mario Kart 8 Deluxe (Switch)",
    imagen: "Imagenes/servicio/mario-kart-8-switch.jpg",
    descripcion: "Carreras brutales y diversión asegurada en la versión definitiva.",
    precio: 42000,
    badge: "DISPONIBLE"
  }
];

// CÓDIGO AUTOMÁTICO: Dibuja las tarjetas en mosaico debajo de cada consola
function cargarCatalogo() {
  misProductos.forEach(prod => {
    // Busca el div de la consola usando el ID exacto configurado en tu productos.html
    const seccionConsola = document.getElementById(prod.consola);
    if (!seccionConsola) return; 
    
    const contenedor = seccionConsola.querySelector('.contenedor-catalogo');
    if (!contenedor) return;
    
    // Plantilla única genérica en formato HTML (con fondo blanco para las tarjetas)
    const tarjetaHTML = `
      <div class="tarjeta-juego" style="width: 280px; box-sizing: border-box; background-color: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
          <img src="${prod.imagen}" alt="${prod.nombre}" style="width: 100% !important; max-width: 240px !important; height: 280px !important; object-fit: contain !important; border-radius: 6px; display: block; margin: 0 auto 15px auto; background-color: #ffffff;" class="foto-juego">
          <h3 style="color: #10121a !important; font-family: sans-serif; font-size: 1.1rem; margin: 10px 0; text-align: left;">${prod.nombre}</h3>
          <p class="descripcion" style="color: #4a4a4a !important; font-size: 0.9rem; line-height: 1.4; height: 60px; overflow: hidden; margin-bottom: 15px; text-align: left;">${prod.descripcion}</p>
          <div class="precio" style="color: #10121a !important; font-weight: bold; font-size: 1.3rem; margin-bottom: 10px; text-align: left;">$${prod.precio.toLocaleString('es-AR')}</div>
          <span class="badge disponible" style="margin-bottom: 15px; display: inline-block;">${prod.badge}</span>
          <button class="boton-wpp btn-agregar-carrito" data-nombre="${prod.nombre}" data-precio="${prod.precio}" style="width: 100% !important; padding: 10px !important; font-size: 0.9rem !important; border: none; cursor: pointer; background-color: #25d366; color: white; font-weight: bold; border-radius: 4px;">
            <i class="fa-solid fa-cart-plus" style="margin-right: 8px;"></i> Comprar
          </button>
      </div>
    `;
    
    contenedor.innerHTML += tarjetaHTML;
  });
}

// Inicializa el catálogo al cargar la página web
document.addEventListener("DOMContentLoaded", cargarCatalogo);
