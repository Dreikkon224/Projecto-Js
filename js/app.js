const contenedor = document.getElementById('contenedor')
let carrito = []

document.addEventListener('DOMContentLoaded', async () => {
  await  traerProductos();
  generarProductos();
  const carritoLocal = JSON.parse(localStorage.getItem('carrito'));
  if (carritoLocal != null)
  {
    carrito = carritoLocal;
  }
  mostrarCarrito();
});

async function traerProductos(){
    productos = await fetch('./productos.json').then((response) => {
        if (response.ok){
            return response.json();
        } else {
            throw new Error('Ocurrio una falla, vuelva a intentar');
        }
    }).catch((error) =>{
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
    productos.forEach((producto) =>{
        if (counter <= 4){
            row.innerHTML += `
                <div>
                    <div><img class="img" src="${producto.image}"></div>
                    <div><a href="#">${producto.nombre}</a></div>
                    <div><span>$${producto.precio}</span></div>
                    <div><button data-id="${producto.id}" type="button" class="btn btn-outline-danger">comprar</button>
                    </div>
                </div>
               
            `;
            counter++;
        }else{
            contenedor.appendChild(row);
            row = document.createElement('div');
            row.classList.add('celda');
            row.innerHTML = ``;
            counter=1;
        }
    });
    contenedor.appendChild(row);
}



boton1.addEventListener('click', () => {
    const producto = productos.find ((item) =>{
        return item.id === +boton1.dataset.id
    });
    carrito.push(producto);
    localStorage.setItem('carrito',JSON.stringify(carrito));
    mostrarCarrito();
})

boton2.addEventListener('click', () => {
    const producto = productos.find ((item) =>{
        return item.id === +boton2.dataset.id
    });
    carrito.push(producto);
    localStorage.setItem('carrito',JSON.stringify(carrito));
    mostrarCarrito();
})

boton3.addEventListener('click', () => {
    const producto = productos.find ((item) =>{
        return item.id === +boton3.dataset.id
    });
    carrito.push(producto);
    localStorage.setItem('carrito',JSON.stringify(carrito));
    mostrarCarrito();
})



function mostrarCarrito() {
	const tabla = document.getElementById("items");
	tabla.innerHTML = ``;
	let counter = 1;

	carrito.forEach((producto) => {
		tabla.innerHTML += `
            <tr>
                <td>${counter}</td>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.precio}</td>
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