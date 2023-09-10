const Product = require("../../models/productModel/Product");

//* get all products (GET method) function
const productsGetController = async (req, res, next) => {
  try {
    let { size = 5, sort, page = 1, search = "" } = req.query || req.body;
    const searchBody = req.body.search;

    size = +size; // convert to number
    page = +page; // convert to number

    if (!page) {
      page = 1; // default page value 1
    }
    if (!size) {
      size = 5; // default size value 1
    }
    const skip = (page - 1) * size; // skip logic for pagination
    search = search.toLowerCase(); // convert to lowerCase string

    // this search for only body requested
    if (searchBody) {
      const searchProduct = await Product.find({
        $or: [
          { title: { $regex: ".*" + searchBody + ".*", $options: "i" } },
          { description: { $regex: ".*" + searchBody + ".*", $options: "i" } },
        ],
      })
        .limit(size)
        .skip(skip)
        .sort(sort)
        .populate("user", "username")
        .select("title cover price description");

      return res.status(200).send({ page, size, search: searchProduct });
    }

    //? this search query parameters any where
    const products = await Product.find({
      $or: [
        { title: { $regex: ".*" + search + ".*", $options: "i" } },
        { description: { $regex: ".*" + search + ".*", $options: "i" } },
      ],
    })
      .limit(size)
      .skip(skip)
      .sort(sort)
      .populate("user", "username")
      .select("title cover price description");

    return res.status(200).send({ page, size, data: products });
  } catch (error) {
    next(error);
  }
};

//* Product creation (POST method) function
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
//* Get One (1) Product (GET method) id function
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

//* Product update (PUT method) by Product id function
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

//* Product update (PATCH method) by Product id function
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

//* Product delete (DELETE method) by Product id function
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
