const cron = require("node-cron");
const dbConnection = require("../models/db.js");

module.exports = () => {
  cron.schedule("00 08 * * *", () => {
    sendNotification();
  });

  function sendNotification() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    console.log("Tomorrow is", tomorrow.toLocaleDateString());
    dbConnection.query(
      "SELECT * FROM tasks where due_date = ? ",
      tomorrow.toLocaleDateString(),
      (error, results) => {
        if (error) throw error;
        for (let i = 0; i < results.length; i++) {
          console.log(
            "Task with id :",
            results[i].id,
            " and title",
            results[i].title,
            "is due tomorrow"
          );
        }
      }
    );
  }
};
