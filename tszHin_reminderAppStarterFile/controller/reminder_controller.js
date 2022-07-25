let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },
 
  // this function here is the refers to the index.js' CASE 5, ./reminder/:id
  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },
  create: (req, res) => {
    let reminder = {
      // here has +1 because it will count the user's database length and there is non, means zero.
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    // the created data will be redirected to the path ("<path>") as below
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implement this code
    let reminderToFind = req.params.id
    const reminderDatabaseID = Number(reminderToFind) - 1
    console.log(reminderToFind)
    let editData = {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    };
    console.log(database['cindy'].reminders[reminderDatabaseID]['id'])
    if(Number(reminderToFind) === database['cindy'].reminders[reminderDatabaseID]['id']) {
      database.cindy.reminders[reminderDatabaseID].title = editData.title
      database.cindy.reminders[reminderDatabaseID].description = editData.description
      if(editData.completed === 'false') {
        database.cindy.reminders[reminderDatabaseID].completed = false
      } else {
        database.cindy.reminders[reminderDatabaseID].completed = true
      }
    }
    console.log(database.cindy.reminders)
    res.redirect(`/reminder/${reminderToFind}`);
  },

  delete: (req, res) => {
    // implement this code
   let reminderToFind = req.params.id
   const remindnerDatabaseID = Number(reminderToFind) - 1
   if (Number(reminderToFind) === database['cindy'].reminders[remindnerDatabaseID]){
    database.cindy.reminders.splice(remindnerDatabaseID, 1)
   }
   console.log(database)
   res.redirect("/reminders");
  },
};

module.exports = remindersController;
