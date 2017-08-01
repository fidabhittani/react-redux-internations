import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import expressValidator from "express-validator";
import userRouter from "./routes/user-routes";
import groupRouter from "./routes/group-routes";

// Server constants
const app = express();
const dbURL = "mongodb://localhost:27017/crudInternations";
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use(express.static(path.join(__dirname, "../build")));

// DB Connection
mongoose.connect(dbURL, function(err) {
  if (err) {
    throw err;
  } else {
    console.log("Your MongoDB is running at " + dbURL);
  }
});

// Handling Routes for API.
app.use("/api/user", userRouter);
app.use("/api/group", groupRouter);
app.get("/", function(req, res) {
  res.sendFile("index.html");
});

// Handle 404 Request
app.use((req, res) => {
  res.status(404).json({
    errors: {
      global: "Something Went wrong with the requested resource"
    }
  });
});

// Handle 500 Request
app.use((req, res) => {
  res.status(500).json({
    errors: {
      global: "Something Wrong with Server"
    }
  });
});

app.listen(port, () =>
  console.log(`Server Listening at ${port} : http://localhost:${port}`)
);

//
// function validate(data) {
//   let errors = {};
//   if (data.title === "") errors.title = " No title enetered ";
//   if (data.cover === "") errors.cover = " No cover enetered ";
//
//   const isValid = Object.keys(errors).length === 0;
//
//   return { errors, isValid };
// }

// User Routes

//
// mongodb.MongoClient.connect(dbUrl, (err, db) => {
//   if (err) {
//     console.log("Unable to connect: ", err);
//     return;
//   } else {
//     console.log("Connected Successfully to MongoDB");
//   }
//
//   //assuming app is express Object.
//   app.get("/", function(req, res) {
//     res.sendFile("index.html");
//   });
//
//   /*
// 		Routes and Route Handlers
// 	*/
//   app.get("/api/games", (req, res) => {
//     db.collection("games").find({}).toArray((err, games) => {
//       res.json({ games });
//     });
//   });
//   // Handle Delete game
//
//   app.delete("/api/games/:id", (req, res) => {
//     db
//       .collection("games")
//       .deleteOne(
//         { _id: new mongodb.ObjectId(req.params.id) },
//         (err, deleted) => {
//           if (err) {
//             res.status(500).json({
//               global: "Something Went wrong with the insertion",
//               error: err
//             });
//             return;
//           } else {
//             res.json({ success: "deleted Successfully", deleted: deleted });
//           }
//         }
//       );
//   });
//
//   //  Handle Add new Game Request
//
//   app.post("/api/games", (req, res) => {
//     const { errors, isValid } = validate(req.body);
//
//     if (isValid) {
//       const { title, cover } = req.body;
//       db.collection("games").insert({ title, cover }, (err, result) => {
//         if (err) {
//           res.status(500).json({
//             global: "Something Went wrong with the insertion",
//             error: err
//           });
//         } else {
//           res.json({ game: result.ops[0] });
//         }
//       });
//     } else {
//       res.status(400).json({
//         errors
//       });
//     }
//   });
//
//   // Handle 404 Request
//   app.use((req, res) => {
//     res.status(404).json({
//       errors: {
//         global: "Something Went wrong"
//       }
//     });
//   });
//
//   // Handle 500 Request
//   app.use((req, res) => {
//     res.status(500).json({
//       errors: {
//         global: "Something Wrong with Server"
//       }
//     });
//   });
//
//   app.listen(8080, () => console.log("Server Listening at 8080"));
// });
