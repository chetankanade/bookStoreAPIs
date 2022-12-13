const router = require("express").Router();
const _controller = require("../controller/controller");
const { validate } = require('express-validation');
const { verifyJWT } = require('../../middleware/jwtVerify.middleware');
const _productValidation = require("../validations/product.validation");

router.post("/place-order", verifyJWT, _controller.placeOrder);

module.exports = router;