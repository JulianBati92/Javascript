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

let productosRecuperados;

//Muestro los productos modificando el DOM.

const contenedorProductos = document.getElementById('contenedorProductos');
const contenedorCarrito = document.getElementById('contenedorCarrito');
const verCarritoBtn = document.getElementById('verCarrito');
const vaciarCarritoBtn = document.getElementById('vaciarCarrito');
const totalCompra = document.getElementById('totalCompra');
const finalizarCompraBtn = document.getElementById('finalizarCompra');

// Se recupera el carrito desde el localStorage

let carrito = JSON.parse(storage.getItem("carrito")) || [];
let total = 0;

//Agrega evento click a los botones verCarrito, vaciarCarrito y finalizarCompra

verCarritoBtn.addEventListener('click', mostrarCarrito);
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
finalizarCompraBtn.addEventListener('click', finalizarCompra);

//Se utiliza el método fetch para obtener un archivo JSON llamado "productos.json":

const obtenerDatos = ()=> {
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

obtenerDatos();

//Funcion para obtener los productos desde una API 

function getProductosFromAPI() {
  const apiKey = "MI_CONTRASENA";
    get(`http://localhost:3000/productos=${apiKey}`)
    .then((response) => {
      productos = response.data.data.map((producto) => {
        return new Producto(
          producto.id,
          producto.nombre,
          producto.precio,
          producto.cantidad,
          producto.imagen
        );
      });
    })
    .catch((error) => console.log(error));
}

let productos = [];

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
    const productoEnCarrito = carrito.find(p => p.id === id);
    if(productoEnCarrito) {
      productoEnCarrito.cantidad += 1;
    } else {
      producto.cantidad -= 1;
      carrito.push(producto);
    }
    total += producto.precio;
    totalCompra.innerHTML = total;
  } else {
    alert("No hay mas stock de este Matteoli");
  }
}

// Recorre el array de carrito para crear una vista para cada producto.

function mostrarCarrito() {
  if (carrito.length === 0) {
    alert("No hay productos en el carrito");
    return;
  }
  contenedorCarrito.innerHTML = "";
  for (let i = 0; i < carrito.length; i++) {
    const producto = carrito[i];
    const div = document.createElement('div');
    div.innerHTML = `<div class="col-12">
                      <div class="card">
                        <img src="${producto.imagen}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${producto.nombre}</h5>
                          <p class="card-text">Precio: ${producto.precio}</p>
                          <button class="btn btn-danger" onClick="eliminarDelCarrito(${producto.id})">Eliminar</button>
                        </div>
                      </div>
                    </div>`;
    contenedorCarrito.appendChild(div);
  }
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
mostrarProductos();

//Finaliza la compra hecha por el cliente.

function finalizarCompra() {
  const carrito = JSON.parse(localStorage.getItem('carrito'));
  localStorage.setItem('comprasRealizadas', JSON.stringify(carrito));
  window.location.href = "compraRealizada.html";
}
