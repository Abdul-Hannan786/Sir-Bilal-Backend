import express from "express";
import sendResposne from "../helpers/sendResponse.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/UserModel.js";

// export default async function authenticateUser(req, res, next) {
//   try {
//     const token = req?.headers.authorization?.split(" ")[1];
//     if (!token)
//       return sendResposne(
//         res,
//         401,
//         true,
//         null,
//         "Unauthorized: No token provided"
//       );
//     const decoded = jwt.verify(token, process.env.AUTH_SECRET);
//     if (decoded) {
//       const user = await User.findById(decoded._id);
//       if (!user) return sendResposne(res, 403, true, null, "User not found");
//       req.user = decoded;
//       next();
//     } else {
//       sendResposne(res, 401, true, null, "Unauthorized: Invalid token");
//     }
//   } catch (error) {
//     console.error("Error in user route", error);
//     sendResposne(res, 500, true, null, "Something went wrong");
//   }
// }

export default async function authenticateUser(req, res, next) {
  try {
    const token = req?.headers.authorization?.split(" ")[1];
    if (!token) {
      return sendResposne(
        res,
        401,
        true,
        null,
        "Unauthorized: No token provided"
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.AUTH_SECRET);
    } catch (err) {
      return sendResposne(res, 401, true, null, "Unauthorized: Invalid token");
    }

    const user = await User.findById(decoded._id);
    if (!user) {
      return sendResposne(res, 403, true, null, "User not found");
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error in user route", error);
    sendResposne(res, 500, true, null, "Something went wrong");
  }
}
