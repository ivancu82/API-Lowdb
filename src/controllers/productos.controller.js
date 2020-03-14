const { getConnection } = require("../database");
const { v4 } = require("uuid");

const getProductos = (req, res) => {
  const productos = getConnection()
    .get("productos")
    .value();
  res.json(productos);
};

const createProducto = (req, res) => {
  const newProducto = {
    id: v4(),
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity
  };
  getConnection()
    .get("productos")
    .push(newProducto)
    .write();
  if (newProducto) {
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
};

const getProducto = (req, res) => {
  const producto = getConnection()
    .get("productos")
    .find({ id: req.params.id })
    .value();
  if (producto) {
    res.json(producto);
  } else {
    //res.sendStatus(404);
    res.status(404).send("404 Not Found");
  }

};

const updateProducto = async (req, res) => {
  const result = await getConnection()
    .get("productos")
    .find({ id: req.params.id })
    .assign(req.body)
    .write();
  if (result) {
    //res.json(producto);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }

  //res.json(result);
};

const deleteProducto = async (req, res) => {
  const result = await getConnection()
    .get("productos")
    .remove({ id: req.params.id })
    .write();
  if (result) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
  //res.json(result);
};

module.exports = {
  getProductos,
  getProducto,
  createProducto,
  updateProducto,
  deleteProducto
};
