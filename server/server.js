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