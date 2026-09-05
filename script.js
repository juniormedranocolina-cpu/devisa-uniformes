/* ==================================
   VARIABLES
================================== */

let carrito = [];



/* ==================================
   MENÚ RESPONSIVE
================================== */

function mostrarMenu() {

    const menu = document.getElementById("menu");

    menu.classList.toggle("activo");

}



/* ==================================
   AGREGAR PRODUCTO
================================== */

function agregarCarrito(nombre, precio) {

    const productoExistente = carrito.find(
        producto => producto.nombre === nombre
    );


    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });

    }


    actualizarCarrito();

    abrirCarrito();

}



/* ==================================
   ACTUALIZAR CARRITO
================================== */

function actualizarCarrito() {

    const lista = document.getElementById("listaCarrito");

    const contador = document.getElementById("contador");

    const totalElemento = document.getElementById("total");


    lista.innerHTML = "";


    let total = 0;

    let cantidadTotal = 0;


    if (carrito.length === 0) {

        lista.innerHTML = `
            <p style="
                text-align:center;
                color:#777;
                padding:40px 0;
            ">
                Tu carrito está vacío.
            </p>
        `;

    }


    carrito.forEach((producto, index) => {

        const subtotal =
            producto.precio * producto.cantidad;


        total += subtotal;

        cantidadTotal += producto.cantidad;


        const item = document.createElement("div");

        item.classList.add("item-carrito");


        item.innerHTML = `

            <div>

                <h4>${producto.nombre}</h4>

                <p>
                    ${formatearPrecio(producto.precio)}
                    × ${producto.cantidad}
                </p>

            </div>


            <button
                class="eliminar"
                onclick="eliminarProducto(${index})">

                ✕

            </button>

        `;


        lista.appendChild(item);

    });


    contador.textContent = cantidadTotal;

    totalElemento.textContent =
        formatearPrecio(total);

}



/* ==================================
   ELIMINAR PRODUCTO
================================== */

function eliminarProducto(index) {

    carrito.splice(index, 1);

    actualizarCarrito();

}



/* ==================================
   ABRIR CARRITO
================================== */

function abrirCarrito() {

    document
        .getElementById("carrito")
        .classList.add("activo");

}



/* ==================================
   CERRAR CARRITO
================================== */

function cerrarCarrito() {

    document
        .getElementById("carrito")
        .classList.remove("activo");

}



/* ==================================
   FORMATEAR PRECIO
================================== */

function formatearPrecio(numero) {

    return numero.toLocaleString(
        "es-CO",
        {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0
        }
    );

}



/* ==================================
   ENVIAR PEDIDO A WHATSAPP
================================== */

function enviarPedido() {

    if (carrito.length === 0) {

        alert("Primero agrega productos a tu pedido.");

        return;

    }


    let mensaje =
        "Hola DEVISA 👋, quiero realizar el siguiente pedido:%0A%0A";


    let total = 0;


    carrito.forEach(producto => {

        const subtotal =
            producto.precio * producto.cantidad;


        total += subtotal;


        mensaje +=
            `• ${producto.nombre} x${producto.cantidad} - ${formatearPrecio(subtotal)}%0A`;

    });


    mensaje +=
        `%0A*Total: ${formatearPrecio(total)}*`;


    const telefono =
        "573136363939";


    const url =
        `https://wa.me/${telefono}?text=${mensaje}`;


    window.open(url, "_blank");

}



/* ==================================
   CERRAR MENÚ AL HACER CLIC
================================== */

document.querySelectorAll("#menu a").forEach(enlace => {

    enlace.addEventListener("click", () => {

        document
            .getElementById("menu")
            .classList.remove("activo");

    });

});



/* ==================================
   INICIAR CARRITO
================================== */

actualizarCarrito();