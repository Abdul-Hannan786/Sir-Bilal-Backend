import express from "express";
import sendResposne from "../helpers/sendResponse.js";
import Todo from "../models/TodoModel.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { todo } = req.body;
  if (!todo) {
    return sendResposne(res, 400, true, null, "Todo is required");
  }
  const newTodo = Todo.create({ todo });
  sendResposne(res, 201, false, newTodo, "Todo created successfully");
});

export default router;
