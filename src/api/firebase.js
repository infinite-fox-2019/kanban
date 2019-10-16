const db = require("@/config/firebase");

const Task = db.collection("tasks");

module.exports = {
  Task
};
