import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/users.js";

const app = express();
const PORT = 3000;

// {Application Level Middleware}
const middleware = (req, res, next) => {
  console.log("Middleware called", Date.now());
  // res.status(500).send("Internal Server Error");
  next();
};

app.use(middleware);
app.use(morgan("tiny"));
app.use(express.json());

const tasks = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
];

// {Params}
app.get("/", (req, res) => {
  res.status(200).send(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const task = tasks.find((task) => task.id == id);
  if (task) {
    res.status(200).send(task);
  } else {
    res.status(404).send({ message: "Task not found" });
  }
});
// {query}

app.get("/tasks", (req, res) => {
  const { completed } = req.query;
  let filter = tasks;
  if (completed) {
    filter = tasks.filter((data) =>
      completed === "true" ? data.completed === true : data.completed === false
    );
  }
  res.status(200).send(filter);
});

// app.post("/", (req, res) => {
//   console.log(req.body)
//   res.send("Post request called!");
// });
// app.put("/", (req, res) => {
//   res.send("Put request called!");
// });
// app.delete("/", (req, res) => {
//   res.send("Delete request called!");
// });

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
