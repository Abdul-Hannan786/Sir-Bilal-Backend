import express from "express";
import Joi from "joi";
import sendResposne from "../helpers/sendResponse.js";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import "dotenv/config";

const router = express.Router();

const registerSchema = Joi.object({
  fullname: Joi.string().min(3).max(30).required(),
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
router.post("/login", (req, res) => {});

export default router;
