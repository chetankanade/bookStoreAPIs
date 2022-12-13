const jwt = require("jsonwebtoken");
const { User } = require("../../models/index");

module.exports = {
  verifyJWT: async (req, res, next) => {
    try {
      let token = req.headers.authorization?.split(" ")[1];

      let jsonWebToken;

      if (!token) throw new Error("jwt token required!");

      jsonWebToken = jwt.verify(token, process.env.SECRET_KEY);

      let user_type = jsonWebToken.type == "Customer" ? 1 : 2;

      let user = await User.findOne({
        where: {
          user_id: jsonWebToken.user_id,
          user_type: user_type,
        },
      });

      user = JSON.parse(JSON.stringify(user));

      if (!user) throw new Error("Invalid Request");

      req["user"] = user;
      res.locals.user = user;
      next();
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  },
};
