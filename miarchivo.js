function saludar() {
  let nombre = prompt('¿Cuál es tu nombre?');
  let apellido = prompt('¿Cuál es tu apellido?');

  alert(`Hola ${nombre} ${apellido}, ¿tomamos unos mates?`);

  let entrada = prompt('Ingresar tus redes sociales');

  while (entrada) {
    switch (entrada) {
      case "instagram.com/":
        alert("Gracias por ingresar tu instagram, tienes un 20% de descuento ingresando el código MATTEOLIIG en la tienda online");
        break;
      case "facebook.com/":
        alert("Gracias por ingresar tu facebook, tienes un 20% de descuento ingresando el código MATTEOLIFB en la tienda online");
        break;
      default:
        if (entrada.includes(".")) {
          alert("Gracias por ingresar tu red social, tienes un 10% de descuento ingresando el código MATTEOLI en la tienda online");
        } else {
          alert("Gracias por tu tiempo!!!")
        }
        break;
    }

    entrada = prompt("Ingresar tus redes sociales");
  }
}

saludar();


class Productos {
    constructor(mate, modelo, precio) {
      this.mate = mate;
      this.modelo = modelo;
      this.precio = precio;
    }
}

let listaDeProductos = [
    {id:1, mate: "set completo", modelo: "set", precio: 1000, stock:3},
    {id:2, mate: "plata 925 crem", modelo: "imperial", precio: 2850, stock: 8},
    {id:3, mate: "plata 925 blanco", modelo: "imperial", precio: 2600, stock: 15},
    {id:4, mate: "rosalia", modelo: "imperial", precio: 2500, stock:10},
    {id:5, mate: "beige", modelo: "torpedo", precio: 2200, stock: 22},
    {id:6, mate: "blanco", modelo: "imperial", precio: 2500, stock: 7},
    {id:7, mate: "cream", modelo: "camionero", precio: 2300, stock:18},
    {id:8, mate: "negro", modelo: "imperial", precio: 2500, stock: 1},
    {id:9, mate: "alpaca", modelo: "bombilla", precio: 1900, stock: 23},
    {id:10, mate: "acero", modelo: "bombilla", precio: 1500, stock: 40},
];

let listaDeProductosDesdeStorage = JSON.parse(localStorage.getItem("listaDeProductos"));
const listaDeProducto = JSON.parse(localStorage.getItem("listaDeProductos"));

listaDeProductos.forEach((producto)=> {
    console.log(`este ${producto.modelo} ${producto.mate} y el precio es $${producto.precio}`)
})

let busquedaUsuario = prompt("que modelo queres buscar?")
const busqueda = listaDeProductos.find (producto => producto.mate == busquedaUsuario);
console.log (busqueda)

let filtraPorPrecio = prompt("que precio?")
const filtra = listaDeProductos.filter (producto => producto.precio > 1000);
console.log (filtra)

let crearProducto = () => {
    let mate = document.querySelector("#mate").value;
    let modelo = document.querySelector("#modelo").value;
    let precio = parseInt(document.querySelector("#precio").value);

    let mateNuevo = new Productos(mate, modelo, precio);
    productosAgregados.push(mateNuevo);
    return productosAgregados
}

let pintarHTML = () => {
    productosAgregados.forEach(producto => {
        if (producto.stock > 0) {
            let contenedor = document.createElement("div");
            contenedor.setAttribute("id", producto.id);
            contenedor.innerHTML = `<h3> ${producto.mate}</h3>
                              <p> ${producto.modelo}</p>
                              <b> $${producto.precio}</b>
                            `;
            document.getElementById("div").appendChild(contenedor);
        } else {
            document.getElementById("div").innerHTML += `<p>Huy, justo ese no queda ${producto.mate}</p>`
        }
    })
}

const div = document.createElement('div');
div.innerHTML = '<p>Se agrega una division</p>';
document.body.appendChild(div);

const contenedor = document.querySelector('.contenedor');

function mostrarProductos() {
  let html = prompt ('Mate?');
  listaDeProductos.forEach(producto => {
    html += `<p>${producto.mate}</p>`;
  });
  contenedor.innerHTML = html;
}

mostrarProductos();
