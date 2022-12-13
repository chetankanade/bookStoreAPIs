const router = require("express").Router();
const _controller = require("../controller/controller");
const { validate } = require("express-validation");
const { verifyJWT } = require("../../middleware/jwtVerify.middleware");
const _productValidation = require("../validations/product.validation");

router.post(
  "/add-update-product",
  verifyJWT,
  validate(_productValidation.addUpdateProduct),
  _controller.addUpdateProduct
);
router.post("/all-books", verifyJWT, _controller.allBooks);

module.exports = router;
