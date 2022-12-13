const router = require("express").Router();
const _controller = require("../controller/controller");
const { verifyJWT } = require("../../middleware/jwtVerify.middleware");
const { validate } = require("express-validation");
const _UserValidation = require("../validations/user.validation");

router.post("/signup", _controller.userSignup);
router.post("/login", _controller.userLogin);
router.post("/add-user-address", verifyJWT, _controller.addUserAddress);
router.post("/user-order-list", verifyJWT, _controller.UserOrderList);
router.post(
  "/seller-product-ordered-list",
  verifyJWT,
  _controller.sellerProductOrdered
);
router.post("/update-delete-user", verifyJWT, _controller.updateDeleteUser);
module.exports = router;
