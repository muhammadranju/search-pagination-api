const product = require("express").Router();
const productCon = require("../../controller/product/productController");

product.get("/products/:id", productCon.productsGetByIdController);
product.put("/products/:id", productCon.productsPutByIdController);
product.patch("/products/:id", productCon.productsPatchByIdController);
product.delete("/products/:id", productCon.productsDeleteByIdController);

product.get("/products", productCon.productsGetController);
product.post("/products", productCon.productsPostController);

module.exports = product;
