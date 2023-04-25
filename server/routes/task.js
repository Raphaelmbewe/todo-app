const express = require("express");
const pool = require("../database");
const router = express.Router();

// create task
router.post("/create", async (req, res) => {
  try {
    const { name, description, status, favorite, createdAt } = req.body;
    const newStatus = status || "open";
    const newFavorite = favorite || false;
    const newTask = await pool.query(
      "INSERT INTO task (name, description, status, favorite, createdAt) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, description, newStatus, newFavorite, createdAt]
    );

      res.json({
          task: newTask.rows[0],
          message: "Task created successfully"
      });
  } catch (err) {
    console.error(err.message);
  }
});

//get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const allTasks = await pool.query("SELECT * FROM task");
    res.json(allTasks.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a task

router.get("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await pool.query("SELECT * FROM task WHERE task_id = $1", [
      id,
    ]);

    res.json(task.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a task

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status, favorite } = req.body;
    const updateTask = await pool.query(
      "UPDATE task SET name=$1, description=$2, status=$3, favorite=$4  WHERE task_id = $5",
      [name, description, status, favorite, id]
    );

    res.json({ message: "Task was updated!" });
  } catch (err) {
    console.error(err.message);
  }
});

//delete a task

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM task WHERE task_id = $1", [
      id,
    ]);
    res.json({ message: "Task was deleted!" });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
