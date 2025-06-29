import express from "express";
import morgan from "morgan";

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

app.get("/", (req, res) => {
  res.send("Get request called!");
});

app.post("/", (req, res) => {
  console.log(req.body)
  res.send("Post request called!");
});
app.put("/", (req, res) => {
  res.send("Put request called!");
});
app.delete("/", (req, res) => {
  res.send("Delete request called!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
