const { Router } = require("express");
const router = Router();

const {
  getProducto,
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto
} = require("../controllers/productos.controller");

router.get('/productos', getProductos);
router.get('/productos/:id', getProducto);
router.post('/productos', createProducto);
router.put('/productos/:id', updateProducto);
router.delete('/productos/:id', deleteProducto);

module.exports = router;
