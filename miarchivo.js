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
    new Producto(1, 'SET MATTEOLI', 10000, 3),
    new Producto(2, 'IMPERIAL 925 CREAM', 2850, 8),
    new Producto(3, 'IMPERIAL 925 BLANCO', 2600, 15),
    new Producto(4, 'IMPERIAL ROSALIA', 2500, 10),
    new Producto(5, 'TORPEDO BEIGE', 2200, 22),
    new Producto(6, 'IMPERIAL BLANCO', 2500, 7),
    new Producto(7, 'CAMIONERO CREAM', 2300, 18),
    new Producto(8, 'IMPERIAL NEGRO', 2500, 1),
    new Producto(9, 'BOMBILLA ALPACA', 1900, 23),
    new Producto(10,'BOMBILLA ACERO', 1500, 40),
];

//Se utiliza el método fetch para obtener un archivo JSON llamado "productos.json":

function getProductos() {
  return fetch("productos.json")
  .then(response => response.json())
  .then(error => console.error(error))
}

//Funcion para obtener los productos de la API:

function getProductosFromAPI() {
  const apiKey = "MI_CONTRASENA";
  return fetch(`https://miapi.com/api/products?api_key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    if (data.status === "success") {
      const productos = data.data.map(producto => {
        return new Producto(producto.id, producto.nombre, producto.precio, producto.cantidad);
      });
      return productos;
    } else {
      console.error(data.message);
    }
  })
  .catch(error => console.error(error))
}

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
