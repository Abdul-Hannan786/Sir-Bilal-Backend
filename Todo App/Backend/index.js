import express from "express";
import morgan from "morgan";
import "dotenv/config";
import mongoose from "mongoose";
import taskRoutes from "./routes/tasks.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import todoRoutes from "./routes/todo.js";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// {Params}
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.use("/task", taskRoutes)
app.use("/auth", authRoutes)
app.use("/user", userRoutes)
app.use("/todo", todoRoutes)

mongoose
  .connect(process.env.MONGODBURI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection failed:", err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
