const express = require('express');
const router = express.Router();
const { requireSignin, adminMiddleware } = require('../common-middleware');
const multer = require('multer');
const { createProduct, getProductsBySlug, getProducts, getProductDetailsById } = require('../controller/product');
const path = require('path');
const shortid = require('shortid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    },
});
const upload = multer({ storage });

router.post(
    "/product/create",
    requireSignin,
    adminMiddleware,
    upload.array("productPicture"),
    createProduct
);
router.get("/products/:slug", getProductsBySlug);
router.post("/product/getProducts", requireSignin, adminMiddleware, getProducts);
//router.get('/category/getcategory', getCategories);
router.get('/product/:productId', getProductDetailsById)

module.exports = router;