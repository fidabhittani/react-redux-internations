import express from "express";
import util from "util";
const userRouter = express.Router();

import User from "../models/user";
import Group from "../models/group";
//Middle ware that is specific to this Router
userRouter.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

// Define the home page route
userRouter.get("/", (req, res) => {
  User.find({}).populate("groups").exec((err, dbusers) => {
    var users = [];
    dbusers.forEach(user => {
      users.push(user);
    });
    res.send({ users });
  });
});

// Define the home page route
userRouter.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) {
      res.status(500).json({
        errors: {
          global: err.message,
          error: err
        }
      });
    } else {
      res.json({ message: "User successfully deleted", id: user._id });
    }
  });
});

// Define the home page route
userRouter.put("/:id", (req, res) => {
  User.findOne({ _id: req.params.id }).exec(function(err, user) {
    if (err) {
      res.status(500).json({
        errors: {
          global: err.message,
          error: err
        }
      });
    } else {
      if (req.body.assign) {
        if (!user.groups.includes(req.body.groupId)) {
          user.groups.push(req.body.groupId);
        }
      } else {
        let indexUser = user.groups.indexOf(req.body.groupId);
        if (indexUser !== -1) {
          user.groups.splice(indexUser, 1);
        }
      }
      user.save();

      Group.findOne({ _id: req.body.groupId }).exec(function(err, group) {
        if (req.body.assign) {
          console.log(group.users);
          if (!group.users.includes(req.body._id)) {
            group.users.push(req.body._id);
          }
        } else {
          let index = group.users.indexOf(req.body._id);
          if (index !== -1) {
            group.users.splice(index, 1);
          }
        }
        group.save();
      });

      res.json({ user });
    }
  });
});

// Define the home page route
userRouter.get("/:id", (req, res) => {
  User.findOne({ _id: req.params.id })
    .populate("groups") // only return the Persons name
    .exec(function(err, user) {
      if (err) {
        res.status(500).json({
          errors: {
            global: err.message,
            error: err
          }
        });
      } else {
        res.json({ user });
      }
    });
});

// Define the home page route
userRouter.post("/create", (req, res) => {
  req.checkBody("firstName", "firstName is required").notEmpty();
  req.checkBody("lastName", "lastName is required").notEmpty();
  req.checkBody("username", "username is required").notEmpty();
  req.checkBody("email", "email is required").notEmpty();
  req.checkBody("dob", "dob is required").notEmpty();
  req.checkBody("groups", "Groups is required").notEmpty();

  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      let errors = {};
      result.array().map(error => {
        errors[error.param] = error.msg;
      });
      res.status(400).json({ errors });
      return;
    }

    const { firstName, lastName, username, email, dob, avatar } = req.body;
    let groups = req.body.groups.split(",");
    let user = new User({
      firstName,
      lastName,
      username,
      email,
      dob,
      avatar,
      groups
    });
    user.save(function(err, user) {
      if (err) {
        res.status(500).json({
          errors: {
            global: err.message,
            error: err
          }
        });
      } else {
        user.groups.forEach(groupId => {
          Group.findOne({ _id: groupId }).exec(function(err, group) {
            if (err) {
              console.log("No Group found");
            }
            if (!group.users.includes(user._id)) {
              group.users.push(user._id);
            }
            group.save();
          });
        });

        res.json({ user });
      }
    });
  });
});

// Define the about route
userRouter.post("/", (req, res) => {
  res.send("user post  us");
});

export default userRouter;
