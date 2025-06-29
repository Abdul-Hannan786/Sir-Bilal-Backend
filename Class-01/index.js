import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Get request called!");
});

app.post("/", (req, res) => {
    res.send("Post request called!");
})
app.put("/", (req, res) => {
    res.send("Put request called!");
})
app.delete("/", (req, res) => {
    res.send("Delete request called!");
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
