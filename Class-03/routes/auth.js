import express from "express";
import Joi from "joi";
import sendResposne from "../helpers/sendResponse.js";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";

const router = express.Router();

const registerSchema = Joi.object({
  fullname: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().min(6).max(30).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().min(6).max(30).required(),
});

router.post("/register", async (req, res) => {
  const { fullname, email, password } = req.body;
  const { error, value } = registerSchema.validate({
    fullname,
    email,
    password,
  });
  if (error)
    return sendResposne(res, 400, true, null, error.details[0].message);

  const existingUser = await User.findOne({ email: value.email });
  if (existingUser)
    return sendResposne(res, 400, true, null, "User already exists");

  const hashedPassword = await bcrypt.hash(value.password, 10);
  value.password = hashedPassword;

  try {
    const user = await User.create({ ...value });
    return sendResposne(res, 201, false, user, "User registered successfully");
  } catch (error) {
    return sendResposne(res, 500, true, null, "Internal server error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { error, value } = loginSchema.validate({
    email,
    password,
  });
  if (error)
    return sendResposne(res, 400, true, null, error.details[0].message);

  try {
    const user = await User.findOne({ email: value.email }).lean();
    if (!user)
      return sendResposne(res, 400, true, null, "User is not registered");

    const isPassswordValid = await bcrypt.compare(
      value.password,
      user.password
    );
    if (!isPassswordValid)
      return sendResposne(res, 400, true, null, "Invalid credentials");

    const token = jwt.sign(user, process.env.AUTH_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    return sendResposne(
      res,
      200,
      false,
      { user, token },
      "User logged in successfully"
    );
  } catch (error) {
    console.error("Error during login:", error);
    sendResposne(res, 500, true, null, "Internal server error");
  }
});

export default router;
