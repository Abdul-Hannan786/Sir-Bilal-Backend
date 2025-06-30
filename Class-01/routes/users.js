import express from "express";

const router = express.Router();
const users = [
  {
    fullname: "John Doe",
    email: "abdul@gmail.com",
    id: 1,
  },
];

router.get("/", (req, res) => {
  res.status(200).json({
    error: false,
    message: "Users fetched successfully",
    data: users,
  });
});

router.post("/", (req, res) => {
  const { fullname, email } = req.body;
  users.push({ fullname, email, id: users.length + 1 });
  res.status(201).json({
    error: false,
    message: "User created successfully",
    data: users,
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === Number(id));
  console.log(user)

  if (!user) {
    return res.status(404).json({
      error: true,
      message: "User not found",
      data: null,
    });
  }

  res.status(201).json({
    error: false,
    message: "User found successfully",
    data: users,
  });
});

export default router;