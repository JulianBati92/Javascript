window.onload = function() {
    const storage = window.localStorage;

//Creo la clase Producto, con las propiedades id, nombre, precio y cantidad:

class Producto {
  constructor(id, nombre, precio, cantidad, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
    this.imagen = imagen;
  }
}

//Se utiliza el método fetch para obtener un archivo JSON llamado "productos.json":

const url ="./productos.json"

function getProductos() {
  return fetch(url)
  .then(res => res.json())
  .then(data => console.log(data))
}

//Funcion para obtener los productos de la API:

function getProductosFromAPI() {
  fetch("http://localhost:3000/productos")
    .then((response) => {
      return response.json();
    })
    .then((productos) => {
      productos.forEach((producto) => {
        let productoDiv = document.createElement("div");
        productoDiv.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <p>${producto.nombre}</p>
          <p>$${producto.precio}</p>
          <button class="btn btn-primary" id="agregarAlCarrito">Agregar al carrito</button>
        `;
        document.getElementById("contenedorProductos").appendChild(productoDiv);
      });
    });
}    

// Recuperar el objeto del local storage:
const productosRecuperados = JSON.parse(localStorage.getItem('productos'));

let contenedorProductos;
let verCarritoBtn;
let vaciarCarritoBtn;
let totalCompra;
let finalizarCompraBtn;

let carrito = [];
let total = 0;

document.addEventListener("DOMContentLoaded", function(){
    contenedorProductos = document.getElementById('contenedorProductos');
    verCarritoBtn = document.getElementById('verCarrito');
    vaciarCarritoBtn = document.getElementById('vaciarCarrito');
    totalCompra = document.getElementById('totalCompra');
    finalizarCompraBtn = document.getElementById('finalizarCompra');
    mostrarProductos();
});

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
  if(producto.cantidad === 0){
    alert(`No hay stock del producto ${producto.nombre}`);
    return;
  }
  carrito.push(producto);
  producto.cantidad--;
  total += producto.precio;
  totalCompra.innerText = total;
}

// Muestra los productos en el carrito y calcula el total de la compra.

function mostrarCarrito() {
    const contenedorCarrito = document.getElementById('contenedorCarrito');
    contenedorCarrito.innerHTML = "";
    carrito.forEach((producto) => {
        const divProducto = document.createElement('div');
        divProducto.innerHTML = `
        <div>
            <img src="img/${producto.id}.jpg" class="img-fluid py-3">
            <div>
                <h5>${producto.nombre}</h5>
                <p>$ ${producto.precio}</p>
            </div>
        </div>`;
        contenedorCarrito.appendChild(divProducto);
    });
    const totalCompra = document.getElementById('totalCompra');
    totalCompra.innerText = carrito.reduce((total, producto) => total + producto.precio, 0);
}

// Vacía el carrito y actualiza el total de la compra.

function vaciarCarrito() {
    carrito = [];
    total = 0;
    mostrarCarrito();
}
// Finaliza la compra y vacía el carrito.

function finalizarCompra() {
    alert(`Compra finalizada. Total: $${total}`);
    vaciarCarrito();
}

if(verCarritoBtn) verCarritoBtn.addEventListener('click', mostrarCarrito);
    if(vaciarCarritoBtn) vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    if(finalizarCompraBtn) finalizarCompraBtn.addEventListener('click', finalizarCompra);
};
