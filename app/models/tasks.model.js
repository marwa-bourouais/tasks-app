const sql = require("./db.js");

// constructor
const Task = function (task) {
  this.title = task.title;
  this.description = task.description;
  this.due_date = task.due_date;
};

// Get all tasks
Task.getAll = (result) => {
  sql.query("SELECT * FROM tasks", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};
// Get one task by its id
Task.findById = (taskId, result) => {
  sql.query(`SELECT * FROM tasks WHERE id = ${taskId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found task: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found task with the id
    result({ kind: "task not found" }, null);
  });
};
// Create a new task
Task.create = (newTask, result) => {
  sql.query("INSERT INTO tasks SET ?", newTask, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created task: ", { id: res.insertId, ...newTask });
    result(null, { id: res.insertId, ...newTask });
  });
};
// Update a task
Task.updateById = (id, task, result) => {
  sql.query(
    "UPDATE tasks SET title = ?, description = ?, due_date = ? WHERE id = ?",
    [task.title, task.description, task.due_date, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found task with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated task: ", { id: id, ...task });
      result(null, { id: id, ...task });
    }
  );
};

//Delete a task
Task.remove = (id, result) => {
  sql.query("DELETE FROM tasks WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found task with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted task with id: ", id);
    result(null, res);
  });
};

module.exports = Task;
