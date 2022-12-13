const nodeGeoCoder = require("node-geocoder");
const jwt = require("jsonwebtoken");
const argon = require("argon2");

async function hashPassword(password) {
  let hash = argon.hash(password, { row: true });

  return hash;
}

async function verifyPassword(planePassword, hashPassword) {
  return argon.verify(hashPassword, planePassword);
}

async function jwtToken(data) {
  let token = jwt.sign(data, process.env.SECRET_KEY, {
    algorithm: "HS256", //Algorithm used
    expiresIn: "1h",
  });

  return token;
}

async function geoCordinates(zipcode) {
  try {
    let options = {
      provider: "openstreetmap",
    };

    let geoCoder = nodeGeoCoder(options);

    let res = await geoCoder.geocode(zipcode + ", india");

    return res[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

function _response(res, statusCode, message, data) {
  let object = {
    status: statusCode == 200 ? true : false,
    message,
    data,
  };
  if (data == null || !data) {
    delete object.data;
  }

  return res.status(statusCode).json(object);
}

module.exports = {
  _response,
  geoCordinates,
  jwtToken,
  hashPassword,
  verifyPassword,
};
