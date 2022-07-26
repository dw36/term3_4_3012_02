const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session")
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");


app.use(express.static(path.join(__dirname, "public")));

app.use(ejsLayouts);

app.set("view engine", "ejs");



// Routes start here

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require("./middleware/passport");
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");


app.use(express.json()); 
app.use(passport.initialize()); 
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log(req.session.passport);
  next();
});

app.get("/reminders", reminderController.list);

// case 3: User goes to localhost:3000(port number we defined/new -> Show a CREATE REMINDER PAGE)
app.get("/reminder/new", reminderController.new);

// case 4: User SENDS NEW REMINDER DATA TO US (CREATING A REMINDER)
app.post("/reminder/", reminderController.create);
//case 5: User wants to SEE an individual reminder // the listOne functino is located in the <BASEFOLDER>/controller/reminderController/<function named listOne>
app.get("/reminder/:id", reminderController.listOne);
//case 6: User wants to EDIT an inidvidual remidner
app.get("/reminder/:id/edit", reminderController.edit);
//case 7: User clicks the UPDATE BUTTON from case 6, and expects their reminder to be updated // Implement this yourself
app.post("/reminder/update/:id", reminderController.update);
//case 8: User clicks the DELETE BUTTON and we expect the reminder to be deleted // Implement this yourself
app.post("/reminder/delete/:id", reminderController.delete);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.




app.use("/", indexRoute)
app.use("/auth", authRoute)

app.get("/register", authController.register);
//app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);
//app.post("/login", authController.loginSubmit);


//localhost here is 3001 or we can set other port numbers, 
// or we can set the port as a variable if needed
app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
