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

const producto1 = new Producto(1, 'set completo matero', 1000, 3);
const producto2 = new Producto(2, 'imperial 925 cream', 2850, 8);
const producto3 = new Producto(3, 'imperial 926 blanco', 2600, 15);
const producto4 = new Producto(4, 'imperial rosalia', 2500, 10);
const producto5 = new Producto(5, 'torpedo beige', 2200, 22);
const producto6 = new Producto(6, 'imperial blanco', 2500, 7);
const producto7 = new Producto(7, 'camionero cream', 2300, 18);
const producto8 = new Producto(8, 'imperial negro', 2500, 1);
const producto9 = new Producto(9, 'bombilla alpaca', 1900, 23);
const producto10 = new Producto(10,'bombilla acero', 1500, 40);

const productos = [producto1, producto2, producto3, producto4, producto4, producto5, producto6, producto7, producto8, producto9, producto10];

// Almacenar los productos en el local storage:
localStorage.setItem('productos', JSON.stringify(productos));

// Recuperar el objeto del local storage:
const miProductoRecuperado = JSON.parse(localStorage.getItem('producto'));

//Muestro los productos modificando el DOM.

const contenedorProductos = document.getElementById('contenedorProductos');

productos.forEach((producto) => {
  const divProducto = document.createElement('div');
  divProducto.classList.add('card', 'col-xl-3', 'col-md-6', 'col-sm-12');
  divProducto.innerHTML = `
                          <div>
                              <img src="img/${producto.id}.jpg" class="card-img-top img-fluid py-3">
                              <div class="card-body">
                                  <h3 class="card-title"> ${producto.nombre} </h3>
                                  <p class="card-text"> ${producto.precio} </p>
                                  <button id="boton${producto.id}" class="btn btn-primary"> Agregar al Carrito </button>
                              </div>
                          </div>`;
  contenedorProductos.appendChild(divProducto);

  //Agregar un evento al boton de agregar al carrito:
  const boton = document.getElementById(`boton${producto.id}`);
  boton.addEventListener('click', () => {
    agregarAlCarrito(producto.id);
  });
});

//Creo el carrito de compras y una función que busque el producto por id y lo agregue al carrito.

const carrito = [];

//chequea las cantidades:

const agregarAlCarrito = (id) => {
  const producto = productos.find((producto) => producto.id === id);
  const productoEnCarrito = carrito.find((producto) => producto.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push(producto);
  }
  actualizarCarrito();
};

//Muestro el carrito de compras modificando el DOM.

const contenedorCarrito = document.getElementById('contenedorCarrito');
const verCarrito = document.getElementById('verCarrito');

verCarrito.addEventListener('click', actualizarCarrito);

function actualizarCarrito() {
  let aux = '';
  carrito.forEach((producto) => {
    aux += `
              <div class="card col-xl-3 col-md-6 col-sm-12">
                  <img src="img/${producto.id}.jpg" class="card-img-top img-fluid py-3">
                  <div class="card-body">
                      <h3 class="card-title"> ${producto.nombre} </h3>
                      <p class="card-text"> ${producto.precio} </p>
                      <button onClick = "eliminarDelCarrito(${producto.id})" class="btn btn-primary"> Eliminar del Carrito </button>
                  </div>
              </div>
              `;
  });

  contenedorCarrito.innerHTML = aux;
  calcularTotalCompra();

  // Guardar el carrito en local storage:
  storage.setItem('carrito', JSON.stringify(carrito));
}

//Agrego una función que elimine el producto del carrito:

const eliminarDelCarrito = (id) => {
  const producto = carrito.find((producto) => producto.id === id);
  carrito.splice(carrito.indexOf(producto), 1);
  actualizarCarrito();
};

///Función para vaciar todo el carrito por completo:

const vaciarCarrito = document.getElementById('vaciarCarrito');
vaciarCarrito.addEventListener('click', () => {
  carrito.splice(0, carrito.length);
  actualizarCarrito();
});

//Creo una función que me calcule el total del carrito:

const totalCompra = document.getElementById('totalCompra');

const calcularTotalCompra = () => {
  let totalCompra = 0;
  carrito.forEach((producto) => {
    totalCompra += producto.precio;
  });
  document.getElementById('totalCompra').innerHTML = `Total: $${totalCompra}`;
};
