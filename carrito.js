 <!-- BOTÓN FLOTANTE DEL CARRITO -->
    <button id="btn-carrito-flotante" style="position: fixed; bottom: 30px; right: 30px; background-color: #39ff14; width: 60px; height: 60px; border-radius: 50%; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 24px; z-index: 1000; box-shadow: 0 0 15px rgba(57, 255, 20, 0.5);">
        🛒
        <span id="contador-carrito" style="position: absolute; top: -5px; right: -5px; background-color: #ff003c; color: #fff; font-size: 0.75rem; font-weight: bold; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #000;">0</span>
    </button>

    <!-- VENTANA DESPLEGABLE DEL CARRITO -->
    <div id="ventana-carrito" style="position: fixed; top: 0; right: -400px; width: 350px; height: 100%; background-color: #10121a; border-left: 2px solid #00f0ff; box-shadow: -5px 0 25px rgba(0, 240, 255, 0.3); z-index: 100001; transition: right 0.3s ease; padding: 20px; box-sizing: border-box; display: flex; flex-direction: column; font-family: sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #3a3f58; padding-bottom: 15px; margin-bottom: 15px;">
            <h3 style="color: #00f0ff; margin: 0; text-transform: uppercase;">🛒 Tu Carrito</h3>
            <button id="cerrar-carrito" style="background: none; border: none; color: #ff003c; font-size: 1.5rem; cursor: pointer;">&times;</button>
        </div>
        <div id="lista-carrito" style="flex: 1; overflow-y: auto; margin-bottom: 15px;"></div>
        <div style="border-top: 1px solid #3a3f58; padding-top: 15px;">
            <div style="display: flex; justify-content: space-between; font-weight: bold; color: #39ff14; font-size: 1.2rem; margin-bottom: 15px;">
                <span>Total:</span>
                <span id="total-carrito">$0</span>
            </div>
            <button id="btn-enviar-carrito" style="background-color: #39ff14; color: black; border: none; padding: 12px 24px; font-weight: bold; font-size: 1rem; border-radius: 6px; cursor: pointer; width: 100%; margin-top: 15px; box-shadow: 0 0 10px rgba(57, 255, 20, 0.4);">Enviar Pedido</button>
        </div>
    </div>
