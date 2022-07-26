let database = require("../database").Database;
let userModel = require("../database").userModel;

let remindersController = {
  list: (req, res) => {
    console.log(req.user.id)
    const userData = Number(req.user.id) - 1
    res.render("reminder/index", { reminders: database[userData].reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");},
  
    // this function here is the refers to the index.js' CASE 5, ./reminder/:id
  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    const userData = Number(req.user.id) - 1
    let searchResult = database[userData].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database[userData].reminders });
    }
  },

  create: (req, res) => {
    const userData = Number(req.user.id) - 1
    console.log(database[userData].reminders)
    let reminder = {
      id: database[userData].reminders.length + 1, // here has +1 because it will count the user's database length and there is non, means zero.
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database[userData].reminders.push(reminder);
    // the created data will be redirected to the path ("<path>") as below
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    console.log(reminderToFind)
    const userData = Number(req.user.id) - 1
    let searchResult = database[userData].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {             // implement this code
    let reminderToFind = req.params.id
    const userData = Number(req.user.id) - 1
    const reminderDatabaseID = Number(reminderToFind) - 1             
    let editData = {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    };
    console.log(database[userData].reminders[reminderDatabaseID].id)
    if(Number(reminderToFind) === database[userData].reminders[reminderDatabaseID].id) {
      database[userData].reminders[reminderDatabaseID].title = editData.title
      database[userData].reminders[reminderDatabaseID].description = editData.description
      if(editData.completed === 'false') {
        database[userData].reminders[reminderDatabaseID].completed = false
      } else {
        database[userData].reminders[reminderDatabaseID].completed = true
      }
    }
    console.log(database[userData].reminders)
    res.redirect(`/reminder/${reminderToFind}`);
  },

  delete: (req, res) => {
    const userData = Number(req.user.id) - 1    // implement this code
   let reminderToFind = req.params.id
   const remindnerDatabaseID = Number(reminderToFind) - 1
   if (Number(reminderToFind) === database[userData].reminders[remindnerDatabaseID].id){
    database[userData].reminders.splice(remindnerDatabaseID, 1)
   }
   console.log(database)
   res.redirect("/reminders");
  },
};

module.exports = remindersController;
