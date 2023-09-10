const product = require("express").Router();
const productController = require("../../controller/product/productController");

product.get("/products/:id", productController.productsGetByIdController);
product.put("/products/:id", productController.productsPutByIdController);
product.patch("/products/:id", productController.productsPatchByIdController);
product.delete("/products/:id", productController.productsDeleteByIdController);

product.get("/products", productController.productsGetController);
product.post("/products", productController.productsPostController);

module.exports = product;
