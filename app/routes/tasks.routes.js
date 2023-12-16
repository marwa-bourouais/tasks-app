module.exports = (app) => {
  const tasks = require("../controllers/task.controller.js");

  // Create a new task
  app.post("/tasks", tasks.create);

  // Retrieve all tasks
  app.get("/tasks", tasks.findAll);

  // Retrieve a single task with taskId
  app.get("/tasks/:taskId", tasks.findOne);

  //Update a task with taskId
  app.put("/tasks/:taskId", tasks.update);

  // Delete a task with taskId
  app.delete("/tasks/:taskId", tasks.delete);
};
