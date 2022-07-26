const userModel = require("../models/userModel").userModel;
const database =require("../database").Database;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email, password);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

const getUserByUser = (username) => {
  let user = userModel.findByUser(username)
  if (user) {
    return user;
  }
  return null;
}
function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByUser
};
