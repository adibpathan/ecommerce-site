const Product = require("../models/product.model");
const slugify = require("slugify");
const User = require("../models/user.model");

const createProduct = async (req, res, next) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json({ newProduct });
  } catch (error) {
    next(error);
  }
};

//get all products
const getAllProduct = async (req, res, next) => {
  try {
    //filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => {
      delete queryObj[el];
    });
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    //sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    //limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    //pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("this page does not exists");
    }
    const product = await query;
    res.json({ product });
  } catch (error) {
    next(error);
  }
};

//get a single product by using its id
const getProduct = async (req, res, next) => {
  try {
    const getproduct = await Product.findById(req.params.id);
    res.json({ getproduct });
  } catch (error) {
    next(error);
  }
};

//update a products
const updateProduct = async (req, res, next) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const editProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ editProduct });
  } catch (error) {
    next(error);
  }
};

//delete a product
const deleteProduct = async (req, res, next) => {
  try {
    const deleteproduct = await Product.findByIdAndDelete(req.params.id);
    res.json({ deleteproduct });
  } catch (error) {
    next(error);
  }
};

const addToWishlist = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { prodId } = req.body;

    const user = await User.findById(_id);
    const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        { new: true }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        { new: true }
      );
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
};

const rating = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { star, prodId, comment } = req.body;
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedBy.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star,  "ratings.$.comment": comment },
        },
        { new: true }
      );
      // res.json(updateRating)
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedBy: _id,
            },
          },
        },
        { new: true }
      );
      // res.json(rateProduct);
    }
    const getAllratings = await Product.findById(prodId);
    let totalRating = getAllratings.ratings.length;
    let ratingsum = getAllratings.ratings.map((item)=>item.star).reduce((prev, curr)=>prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating)
    let finalproduct = await Product.findByIdAndUpdate(prodId, {
      totalrating: actualRating
    }, {new: true})

    res.json(finalproduct)

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
};
