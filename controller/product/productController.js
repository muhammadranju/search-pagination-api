const Product = require("../../models/productModel/Product");

const productsGetController = async (req, res, next) => {
  try {
    const { limit = "5", sort_by = "asc", page = "1", search = "" } = req.query;

    if (search) {
      const findResult = await Product.find({ title: search });
      if (!findResult) {
        return res.status(400).send({ error: "filled are required" });
      }
      return res.status(200).send({ search: findResult });
    }

    const products = await Product.find()
      .limit(limit)
      .sort({ updatedAt: sort_by })
      .populate("user", "username")
      .select("title cover price description");
    return res.status(200).send({ products });
  } catch (error) {
    next(error);
  }
};

const productsPostController = async (req, res, next) => {
  try {
    const { title, cover, price, description, user } = req.body;
    if (!title || !cover || !price || !description || !user) {
      return res.status(400).send({ error: "filled are required" });
    }
    const product = new Product({
      title,
      cover,
      price,
      description,
      user,
    });
    await product.save();
    return res.status(201).send(product);
  } catch (error) {
    next(error);
  }
};

const productsGetByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findProduct = await Product.findById({ _id: id })
      .populate("user", "username")
      .select("title cover price description");
    if (!findProduct) {
      return res.status(404).send({ error: "Product not found" });
    }
    return res.status(200).send(findProduct);
  } catch (error) {
    next(error);
  }
};
const productsPutByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, cover, price, description, user } = req.body;

    const findProduct = await Product.findById({ _id: id });
    if (!findProduct) {
      return res.status(404).send({ error: "Product not found" });
    }
    const updateProduct = await Product.findOneAndUpdate(
      { _id: id },
      { title, cover, price, description, user }
    );
    return res.status(200).send({ updateProduct });
  } catch (error) {
    next(error);
  }
};
const productsPatchByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { title, cover, price, description, user } = req.body;
    const findProduct = await Product.findById({ _id: id });
    if (!findProduct) {
      return res.status(404).send({ error: "Product not found" });
    }
    title = title ?? title;
    cover = cover ?? cover;
    price = price ?? price;
    description = description ?? description;

    const updateProduct = await Product.findOneAndUpdate(
      { _id: id },
      { title, cover, price, description, user }
    );
    return res.status(200).send({ updateProduct });
  } catch (error) {
    next(error);
  }
};
const productsDeleteByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const queryId = await Product.findById({ _id: id });

    if (!queryId) {
      return res.status(400).send({ error: "id not found" });
    }
    await Product.findByIdAndDelete({ _id: id });
    return res.status(203).send({ message: "Delete product successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  productsPostController,
  productsGetController,
  productsGetByIdController,
  productsPutByIdController,
  productsPatchByIdController,
  productsDeleteByIdController,
};
