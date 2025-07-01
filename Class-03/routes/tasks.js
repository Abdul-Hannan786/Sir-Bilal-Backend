import express from "express";
import Task from "../models/TaskModel.js";
import sendResposne from "../helpers/sendResponse.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { task } = req.body;
  let newTask = new Task({ task });
  await newTask.save();

  sendResposne(res, 201, false, newTask, "Task created successfully");
});

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  sendResposne(res, 200, false, tasks, "Tasks fetched successfully");
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    return sendResposne(res, 404, true, null, "Task not found");
  }
  sendResposne(res, 200, false, task, "Task fetched successfully");
});

// router.put("/:id", async (req, res) => {
//   const { task, completed } = req.body;
//   const { id } = req.params;
//   const DBTask = await Task.findById(id);
//   if (!DBTask) {
//     return sendResposne(res, 404, true, null, "Task not found");
//   }

//   if (task) DBTask.task = task;
//   if (completed) DBTask.completed = completed;

//   await DBTask.save();
//   sendResposne(res, 200, false, DBTask, "Task updated successfully");
// });
router.put("/:id", async (req, res) => {
  const { task, completed } = req.body;
  const { id } = req.params;

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { $set: { task, completed } },
    { new: true, runValidators: true } // new:true returns updated doc, runValidators:true applies schema validation
  );

  if (!updatedTask) {
    return sendResposne(res, 404, true, null, "Task not found");
  }

  sendResposne(res, 200, false, updatedTask, "Task updated successfully");
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) sendResposne(res, 404, true, null, "Task not found");

  await Task.deleteOne({ _id: id });
  sendResposne(res, 200, false, null, "Task deleted successfully");
});

export default router;
