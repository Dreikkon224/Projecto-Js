const contenedor = document.getElementById('contenedor')


let carrito = []

document.addEventListener('DOMContentLoaded', async () => {
    await traerProductos();
    generarProductos();
    const carritoLocal = JSON.parse(localStorage.getItem('carrito'));
    if (carritoLocal != null) {
        carrito = carritoLocal;
    }
    mostrarCarrito();
});

async function traerProductos() {
    productos = await fetch('./productos.json').then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Ocurrio una falla, vuelva a intentar');
        }
    }).catch((error) => {
        Toastify({
            text: error,
            className: "Error"
        }).showToast();
    });
}

function generarProductos() {
    const row = document.createElement('row');
    row.classList.add('celda');
    row.innerHTML = ``;
    let counter = 1;
    productos.forEach((producto) => {
        if (counter <= 8) {
            row.innerHTML += `
                <div>
                    <div><img class="img" src="${producto.image}"></div>
                    <div><a href="#">${producto.nombre}</a></div>
                    <div><span>$${producto.precio}</span></div>
                    <div><button id="boton" data-id="${producto.id}" type="button" class="btn btn-outline-danger ">comprar</button>
                    </div>
                </div>
               
            `;
            counter++;
            console.log(producto)
        } else {
            contenedor.appendChild(row);
            row = document.createElement('div');
            row.classList.add('celda');
            row.innerHTML = ``;
            counter = 1;
        }
    });
    contenedor.appendChild(row);
}



function mostrarCarrito() {
    const tabla = document.getElementById("items");
    tabla.innerHTML = ``;
    let counter = 1;

    carrito.forEach((producto) => {
        tabla.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <th>${Cantidad}/th>
            </tr>
        `;
        counter++;
    });
    tr = document.createElement("tr");
    tr.innerHTML = `<th><th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>${carrito.reduce((total, item) => total + item.precio, 0)} </td>
                        `;
    tabla.appendChild(tr);
}