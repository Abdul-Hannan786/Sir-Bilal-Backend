import express from "express";
import sendResposne from "../helpers/sendResponse.js";
import authenticateUser from "../middlewares/authenticateUser.js";
import User from "../models/UserModel.js";

const router = express.Router();

router.put("/", authenticateUser, async (req, res) => {
  try {
    const { city, country } = req.body;
    const user = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $set: { city, country } },
      { new: true }
    );
    sendResposne(res, 200, "User updated successfully", user);
  } catch (error) {
    console.error("Error in user route", error);
    sendResposne(res, 500, true, null, "Something went wrong");
  }
});

export default router;
