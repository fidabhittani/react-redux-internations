import express from "express";
const groupRouter = express.Router();
import Group from "../models/group";
import User from "../models/user";
//Middle ware that is specific to this Router
groupRouter.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

// Define the home page route
groupRouter.get("/", (req, res) => {
  Group.find({}).populate("users").exec((err, dbGroups) => {
    var groups = [];
    dbGroups.forEach(user => {
      groups.push(user);
    });
    res.send({ groups });
  });
});

// Define the home page route
groupRouter.delete("/:id", (req, res) => {
  Group.findByIdAndRemove(req.params.id, function(err, group) {
    if (err) {
      res.status(500).json({
        errors: {
          global: err.message,
          error: err
        }
      });
    } else {
      res.json({ message: "Group successfully deleted", id: group._id });
    }
  });
});

// Define the home page route
groupRouter.get("/:id", (req, res) => {
  Group.findOne({ _id: req.params.id })
    .populate("users") // only return the Persons name
    .exec(function(err, group) {
      if (err) {
        res.status(500).json({
          errors: {
            global: err.message,
            error: err
          }
        });
      } else {
        res.json({ group });
      }
    });
});

// Define the create route
groupRouter.post("/create", (req, res) => {
  req.checkBody("name", "Group Name is required").notEmpty();
  // req.checkBody("users", "Users is required").notEmpty();

  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      let errors = {};
      result.array().map(error => {
        errors[error.param] = error.msg;
      });
      res.status(400).json({ errors });
      return;
    }

    const { name, image } = req.body;
    let users = users && users.length > 0 ? req.body.users.split(",") : [];

    let group = new Group({
      name,
      users
    });
    group.save(function(err, group) {
      if (err) {
        res.status(500).json({
          errors: {
            global: err.message,
            error: err
          }
        });
      } else {
        group.users.forEach(userId => {
          User.findOne({ _id: userId }).exec(function(err, user) {
            if (err) {
              console.log("No Group found");
            }
            if (!user.groups.includes(group._id)) {
              user.groups.push(group._id);
            }
            user.save();
          });
        });

        res.json({ group });
      }
    });
  });
});

export default groupRouter;
