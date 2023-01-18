const storage = window.localStorage;

//Creo la clase Producto, con las propiedades id, nombre, precio y cantidad:

class Producto {
  constructor(id, nombre, precio, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
  }
}

//Creo productos y los almaceno en un array:

const productos = [
    new Producto(1, 'set completo matero', 1000, 3),
    new Producto(2, 'imperial 925 cream', 2850, 8),
    new Producto(3, 'imperial 926 blanco', 2600, 15),
    new Producto(4, 'imperial rosalia', 2500, 10),
    new Producto(5, 'torpedo beige', 2200, 22),
    new Producto(6, 'imperial blanco', 2500, 7),
    new Producto(7, 'camionero cream', 2300, 18),
    new Producto(8, 'imperial negro', 2500, 1),
    new Producto(9, 'bombilla alpaca', 1900, 23),
    new Producto(10,'bombilla acero', 1500, 40),
];

// Almacenar los productos en el local storage:

localStorage.setItem('productos', JSON.stringify(productos));

// Recuperar el objeto del local storage:

const productosRecuperados = JSON.parse(localStorage.getItem('productos'));

//Muestro los productos modificando el DOM.

const contenedorProductos = document.getElementById('contenedorProductos');
const contenedorCarrito = document.getElementById('contenedorCarrito');
const verCarritoBtn = document.getElementById('verCarrito');
const vaciarCarritoBtn = document.getElementById('vaciarCarrito');
const totalCompra = document.getElementById('totalCompra');

let carrito = [];
let total = 0;

// Crea un div para cada producto en el array de productos.

function crearDivProductos(productos) {
  return productos.map((producto) => {
    const divProducto = document.createElement('div');
    divProducto.classList.add('card', 'col-xl-3', 'col-md-6', 'col-sm-12');
    divProducto.innerHTML = `
    <div>
        <img src="img/${producto.id}.jpg" class="card-img-top img-fluid py-3">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">$ ${producto.precio}</p>
            <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        </div>
    </div>`;
    return divProducto;
  });
}

// Muestra los productos en el contenedor de productos.

function mostrarProductos() {
    contenedorProductos.innerHTML = "";
    const divsProductos = crearDivProductos(productosRecuperados);
    divsProductos.forEach((divProducto) => {
        contenedorProductos.appendChild(divProducto);
    });
}


// Buscar producto en el array de productos recuperados y agrga al carrito actualizando total de compra. Muestra si no hay stock del producto

function agregarAlCarrito(id) {
  const producto = productosRecuperados.find(p => p.id === id);
  if (producto.cantidad > 0) {
    producto.cantidad -= 1;
    carrito.push(producto);
    total += producto.precio;
    totalCompra.innerHTML = total;
  } else {
    alert("No hay mas stock de este Matteoli");
  }
}

// Recorre el array de carrito para crear una vista para cada producto.

function mostrarCarrito() {
contenedorCarrito.innerHTML = "";
carrito.forEach((producto) => {
    const divProducto = document.createElement('div');
    divProducto.classList.add('card', 'col-xl-3', 'col-md-6', 'col-sm-12');
    divProducto.innerHTML = `
    <div>
        <img src="img/${producto.id}.jpg" class="card-img-top img-fluid py-3">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">$ ${producto.precio}</p>
            <button class="btn btn-danger" onclick="quitarDelCarrito(${producto.id})">Quitar del Carrito</button>
        </div>
    </div>`;
    contenedorCarrito.appendChild(divProducto);
});
}

// Buscar producto en el array de carrito, reduce precio, elimina producto de carrito y actualiza.

function quitarDelCarrito(id) {
const productoIndex = carrito.findIndex(p => p.id === id);
total -= carrito[productoIndex].precio;
totalCompra.innerHTML = total;
carrito.splice(productoIndex, 1);
mostrarCarrito();
}

// Vaciar array de carrito.

function vaciarCarrito() {
carrito = [];
total = 0;
totalCompra.innerHTML = total;
mostrarCarrito();
}

// Establecer eventos del mouse para los botones.

verCarritoBtn.addEventListener("click", mostrarCarrito);
vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
mostrarProductos();
