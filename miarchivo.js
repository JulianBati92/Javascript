 function Saludar () {
     let nombre = prompt ('Como es tu nombre?');
     let apellido = prompt ('Como es tu apellido?')
     alert ("Tomamos unos mates? " + nombre + " " + apellido );

  let entrada = prompt("Ingresar tus redes sociales");
  while(entrada != ""){
    switch (entrada) {
       case "instagram.com/":
            alert("Gracias por ingresar tu instagram, tenes un 20% off ingresando el codigo MATTEOLIIG en la tienda online");
            break;
       case "facebook.com/":
            alert("Gracias por ingresar tu facebook, tenes un 20% off ingresando el codigo MATTEOLIFB en la tienda online");
            break;
       default:
           alert("Gracias por tu tiempo!!!")
           break;
   }
   entrada = prompt("Ingresar tus redes sociales");
   }
}

Saludar ()


class Productos {
    constructor(mate, modelo, precio) {
        this.mate = mate;
        this.modelo = modelo;
        this.precio = precio;
    }
}
const listaProductos = [
    {mate: "set completo", modelo: "set", precio: 10000, stock:3},
    {mate: "plata 925 crem", modelo: "imperial", precio: 2850, stock: 8},
    {mate: "plata 925 blanco", modelo: "imperial", precio: 2600, stock: 15},
    {mate: "rosalia", modelo: "imperial", precio: 2500, stock:10},
    {mate: "beige", modelo: "torpedo", precio: 2200, stock: 22},
    {mate: "blanco", modelo: "imperial", precio: 2500, stock: 7},
    {mate: "cream", modelo: "camionero", precio: 2300, stock:18},
    {mate: "negro", modelo: "imperial", precio: 2500, stock: 1},
    {mate: "alpaca", modelo: "bombilla", precio: 2500, stock: 45},
    {mate: "acero", modelo: "bombilla", precio: 2500, stock: 60},
];

listaProductos.forEach((producto)=> {
    console.log(`este mate es ${producto.modelo} ${producto.mate} y el precio es $${producto.precio}`)
})

let busquedaUsuario = prompt("que modelo queres buscar?")
const busqueda = listaProductos.find(producto => producto.mate == busquedaUsuario);
console.log (busqueda)

let filtraPorPrecio = prompt("que precio?")
const filtra = listaProductos.filter(producto => producto.precio > 1500);
console.log (filtra)