
// ====================================================================
// BASE DE DATOS ÁGIL: AGREGA TUS PRODUCTOS EN UNA SOLA LÍNEA AQUÍ
// ====================================================================
document.addEventListener("DOMContentLoaded", () => {

  // SINTAXIS: agregar("id_consola", "Nombre completo", "nombre_imagen.jpg", "Descripción", Precio, "DISPONIBLE/PROMOCION")

  // --- PLAYSTATION 2 ---
  agregar("ps2", "GTA San Andreas (PS2)", "gta-san-andreas-ps2.jpg", "Un clásico absoluto. Revive la historia de CJ en Los Santos.", 5000, "DISPONIBLE");
  agregar("ps2", "Joystick Inalambrico Seisa SJ-913 Azul", "Joystick_ps2_inalambrico_jpg.JPG", "Control preciso, excelente ergonomía. Pilas no incluidas.", 25000, "DISPONIBLE");

  // --- PLAYSTATION 3 ---
  agregar("ps3", "GTA V (PS3)", "gta-v-ps3.jpg", "Los inicios del multijugador y una campaña inolvidable.", 12000, "DISPONIBLE");

  // --- PLAYSTATION 4 ---
  agregar("ps4", "Spider-Man (PS4)", "spider-man-ps4.jpg", "Recorre Nueva York balanceándote con la mejor acción de Marvel.", 35000, "DISPONIBLE");

  // --- PLAYSTATION 5 ---
  agregar("ps5", "GTA V (PS5)", "gta-v-ps5.jpg", "Disfruta de Los Santos con mejoras visuales de nueva generación.", 75000, "PROMOCION");

  // --- XBOX 360 ---
  agregar("xbox-360", "Halo 4 (Xbox 360)", "halo-4-xbox360.jpg", "El regreso del Jefe Maestro en una de las mejores joyas de la consola.", 10000, "DISPONIBLE");
  agregar("xbox-360", "JOYSTICK XBOX360 2.4G NJX312", "joystick-xbox.jpg", "Control inalámbrico de alta precisión para tu Xbox 360.", 35000, "DISPONIBLE");

  // --- XBOX SERIES ---
  agregar("xbox-series", "Forza Horizon 5", "forza-horizon-5-xbox.jpg", "Carreras brutales en gráficos de nueva generación.", 80000, "DISPONIBLE");

  // --- NINTENDO SWITCH ---
  agregar("nintendo-switch", "The Legend of Zelda: Breath of the Wild", "zelda-switch.jpg", "Una aventura de mundo abierto revolucionaria e imperdible.", 45000, "DISPONIBLE");
  agregar("nintendo-switch", "Mario Kart 8 Deluxe (Switch)", "mario-kart-8-switch.jpg", "Carreras brutales y diversión asegurada en la versión definitiva.", 42000, "DISPONIBLE");


  // ====================================================================
  // MOTOR AUTOMÁTICO REPARADO: Genera el Mosaico y conserva el Formato
  // ====================================================================
  function agregar(consolaId, nombre, archivoImagen, desc, precio, estado) {
    const contenedor = document.getElementById(consolaId);
    if (!contenedor) return; // Frena si hay un error de tipeo en el ID de la consola

    const precioFormateado = "$" + precio.toLocaleString('es-AR');

    // Construcción exacta de tu tarjeta con fondo blanco y fuentes legibles
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-juego";
    tarjeta.style.cssText = "width: 280px; box-sizing: border-box; background-color: #ffffff !important; color: #10121a !important; padding: 15px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.15); display: flex; flex-direction: column; justify-content: space-between;";

    tarjeta.innerHTML = `
      <div>
        <img src="Imagenes/servicio/${archivoImagen}" alt="${nombre}" style="width: 100% !important; max-width: 240px !important; height: 280px !important; object-fit: contain !important; border-radius: 6px; display: block; margin: 0 auto 15px auto; background-color: #ffffff !important;" class="foto-juego">
        <h3 style="color: #10121a !important; font-family: sans-serif; font-size: 1.1rem; margin: 10px 0; text-align: left; font-weight: bold;">${nombre}</h3>
        <p class="descripcion" style="color: #4a4a4a !important; font-size: 0.88rem; line-height: 1.4; height: 65px; overflow: hidden; margin-bottom: 15px; text-align: left; font-family: sans-serif;">${desc}</p>
      </div>
      <div>
        <div class="precio" style="color: #10121a !important; font-weight: bold; font-size: 1.3rem; margin-bottom: 10px; text-align: left; font-family: sans-serif;">${precioFormateado}</div>
        <span class="badge disponible" style="margin-bottom: 15px; display: inline-block; font-weight: bold; font-size: 0.75rem; letter-spacing: 1px;">${estado}</span>
        <button class="boton-wpp btn-agregar-carrito" data-nombre="${nombre}" data-precio="${precio}" style="width: 100% !important; padding: 11px !important; font-size: 0.9rem !important; border: none; cursor: pointer; background-color: #25d366; color: white; font-weight: bold; border-radius: 4px; display: flex; justify-content: center; align-items: center; gap: 8px;">
          <i class="fa-solid fa-cart-plus"></i> Comprar
        </button>
      </div>
    `;

    contenedor.appendChild(tarjeta);
  }

  // REENGANCHE AUTOMÁTICO: Avisa a tu sistema del carrito y buscador que el catálogo está listo
  if (typeof inicializarCarrito === 'function') inicializarCarrito();
  if (typeof inicializarBuscador === 'function') inicializarBuscador();
});
