const express = require('express');
const app = express();

const productos = [
  {
      "id": 1,
      "nombre": "SET MATTEOLI",
      "precio": 10000,
      "cantidad": 3,
      "imagen": "img/1.jpg"
  },
  {
      "id": 2,
      "nombre": "IMPERIAL 925 CREAM",
      "precio": 2850,
      "cantidad": 8,
      "imagen": "img/2.jpg"
  },
  {
      "id": 3,
      "nombre": "IMPERIAL 925 BLANCO",
      "precio": 2600,
      "cantidad": 15,
      "imagen": "img/3.jpg"
  },
  {
      "id": 4,
      "nombre": "IMPERIAL ROSALIA",
      "precio": 2500,
      "cantidad": 10,
      "imagen": "img/4.jpg"
  },
  {
      "id": 5,
      "nombre": "TORPEDO BEIGE",
      "precio": 2200,
      "cantidad": 22,
      "imagen": "img/5.jpg"
  },
  {
      "id": 6,
      "nombre": "IMPERIAL BLANCO",
      "precio": 2500,
      "cantidad": 7,
      "imagen": "img/6.jpg"
  },
  {
      "id": 7,
      "nombre": "CAMIONERO CREAM",
      "precio": 2300,
      "cantidad": 18,
      "imagen": "img/7.jpg"
  },
  {
      "id": 8,
      "nombre": "IMPERIAL NEGRO",
      "precio": 2500,
      "cantidad": 1,
      "imagen": "img/8.jpg"
  },
  {
      "id": 9,
      "nombre": "BOMBILLA ALPACA",
      "precio": 1900,
      "cantidad": 23,
      "imagen": "img/9.jpg"
  },
  {
      "id": 10,
      "nombre": "BOMBILLA ACERO",
      "precio": 1500,
      "cantidad": 40,
      "imagen": "img/10.jpg"
  }
];


app.get('/productos', (req, res) => {
    res.json(productos);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});