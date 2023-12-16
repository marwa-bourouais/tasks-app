const Task = require("../models/tasks.model.js");

// Retrieve all tasks from the database.
exports.findAll = (req, res) => {
  Task.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks.",
      });
    else res.send(data);
  });
};

// Find a single task with a taskId
exports.findOne = (req, res) => {
  Task.findById(req.params.taskId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found task with id ${req.params.taskId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving task with id " + req.params.taskId,
        });
      }
    } else res.send(data);
  });
};

// Save Task in the database
exports.create = (req, res) => {
  Task.create(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Task.",
      });
    else res.send(data);
  });
};

//Update a task with taskId
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Task.updateById(req.params.taskId, new Task(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Task with id ${req.params.taskId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Task with id " + req.params.taskId,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Task.remove(req.params.taskId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found task with id ${req.params.taskId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete task with id " + req.params.taskId,
        });
      }
    } else res.send({ message: `Task was deleted successfully!` });
  });
};
