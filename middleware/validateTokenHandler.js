import jwt from "jsonwebtoken";
import { response } from "../utils/response.js";

export const validateToken = async (req, res, next) => {
  let token;

  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return response(
        res,
        { message: "User is not authorized or token is missing" },
        401
      );
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return response(res, { message: "User is not authorized" }, 401);
        }

        console.log("validateTokenHandler - decoded --", decoded);

        req.user = decoded;
        next();
      });
    } catch (err) {
      return response(res, { message: "Token is not valid" }, 400);
    }
  }
};
