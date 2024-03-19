const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  //   let isLoggedIn = req.get("Cookie").split(";")[2].trim().split("=")[1] == "true";
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  //   User.findById("65eaad3f5e7f5fc1bd7375fe")
  //     .then((user) => {
  //       req.session.user = user;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  req.session.isLoggedIn = true;
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
