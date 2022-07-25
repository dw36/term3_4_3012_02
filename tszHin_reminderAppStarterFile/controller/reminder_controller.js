let database = require("../database").Database;
let userModel = require("../database").userModel;

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database[1].reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");},
  
    // this function here is the refers to the index.js' CASE 5, ./reminder/:id
  listOne: (req, res) => {
    let reminderToFind = req.params.id;

    let searchResult = database[1].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database[1].reminders });
    }
  },

  create: (req, res) => {
    console.log(database[1].reminders)
    let reminder = {
      id: database[1].reminders.length + 1, // here has +1 because it will count the user's database length and there is non, means zero.
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database[1].reminders.push(reminder);
    // the created data will be redirected to the path ("<path>") as below
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    console.log(reminderToFind)
    let searchResult = database[1].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {             // implement this code
    let reminderToFind = req.params.id
    const reminderDatabaseID = Number(reminderToFind) - 1             
    let editData = {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    };
    console.log(database[1].reminders[reminderDatabaseID].id)
    if(Number(reminderToFind) === database[1].reminders[reminderDatabaseID].id) {
      database[1].reminders[reminderDatabaseID].title = editData.title
      database[1].reminders[reminderDatabaseID].description = editData.description
      if(editData.completed === 'false') {
        database[1].reminders[reminderDatabaseID].completed = false
      } else {
        database[1].reminders[reminderDatabaseID].completed = true
      }
    }
    console.log(database[1].reminders)
    res.redirect(`/reminder/${reminderToFind}`);
  },

  delete: (req, res) => {    // implement this code
   let reminderToFind = req.params.id
   const remindnerDatabaseID = Number(reminderToFind) - 1
   if (Number(reminderToFind) === database[1].reminders[remindnerDatabaseID].id){
    database[1].reminders.splice(remindnerDatabaseID, 1)
   }
   console.log(database)
   res.redirect("/reminders");
  },
};

module.exports = remindersController;
