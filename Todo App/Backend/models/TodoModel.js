import mongoose from "mongoose";

const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    todo: String,
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todos", todoSchema);
export default Todo;
