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

// Recuperar el objeto del local storage:
const productosRecuperados = JSON.parse(localStorage.getItem('productos'));

//Muestro los productos modificando el DOM.

const contenedorProductos = document.getElementById('contenedorProductos');
const verCarritoBtn = document.getElementById('verCarrito');
const vaciarCarritoBtn = document.getElementById('vaciarCarrito');
const totalCompra = document.getElementById('totalCompra');
const finalizarCompraBtn = document.getElementById('finalizarCompra');

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

const contenedorProducto = ()=> {
  fetch("https://raw.githubusercontent.com/JulianBati92/Javascript/main/productos.json")
     .then(response => response.json())
     .then(resultado => {
         resultado.forEach(producto => {
              contenedorProductos.innerHTML += `
              <div>
                  <img src="${producto.imagen}" class="card-img-top img-fluid py-3">
                  <div class="card-body">
                      <h5 class="card-title">${producto.nombre}</h5>
                      <p class="card-text">$ ${producto.precio}</p>
                      <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
                  </div>
              </div>`;
          })
      })
}

contenedorProducto()

// Buscar producto en el array de productos recuperados y agrga al carrito actualizando total de compra. Muestra si no hay stock del producto

function agregarAlCarrito(id) {
  fetch("https://raw.githubusercontent.com/JulianBati92/Javascript/main/productos.json")
  .then(response => response.json())
  .then(resultado => {
      const producto = resultado.find(p => p.id === id);
      if (producto.cantidad > 0) {
        producto.cantidad -= 1;
        carrito.push(producto);
        total += producto.precio;
        totalCompra.innerHTML = total;
      } else {
        alert("No hay mas stock de este producto");
      }
   })
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
finalizarCompraBtn.addEventListener('click', finalizarCompra);


//Finaliza la compra hecha por el cliente.

function finalizarCompra() {
  const carrito = JSON.parse(localStorage.getItem('carrito'));
  localStorage.setItem('comprasRealizadas', JSON.stringify(carrito));
  window.location.href = "compraRealizada.html";
}
