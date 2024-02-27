"use strict";

const jwt = require("jsonwebtoken");

const model = require("../model/index");

const secretKey = "asdsavjvasxasvhasghasdasdasgdcakhd";

const generateToken = async (payload) => {
  try {
    const token = jwt.sign(
      { Empolyee_id: payload.Empolyee_id, Designation: payload.Designation },
      secretKey
    );
    return token;
  } catch (err) {
    console.log(err);
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const secretKey = "asdsavjvasxasvhasghasdasdasgdcakhd";

    if (!req.headers.authorization)
      throw new Error("Provide a valid JWT Token");

    const token = req.headers.authorization?.split(" ")[1];

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.json({ status: 401, message: "Invalid Token" });
      } else {
        let loggedUser = {
          Empolyee_id: decoded.Empolyee_id,
          Designation: decoded.Designation,
        };
        const userExist = await model.usermanage.findOne({
          Empolyee_id: loggedUser.Empolyee_id,
          Designation: loggedUser.Designation,
        });

        if (!userExist) {
          return res.json({ status: 401, message: "UnAuthorized User" });
        }
        req.loggedUser = loggedUser;
        next();
      }
    });
  } catch (error) {
    return res.json({ status: 401, message: error.message });
  }
};

exports.verifyToken = verifyToken;
exports.generateToken = generateToken;

