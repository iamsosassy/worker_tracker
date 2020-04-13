const express = require("express");
const mongojs = require("mongojs");

const path = require("path");

const app = express();

var workoutmodel = require("./models/workout.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "workout";
// const collections = ["notes"];

const db = mongojs(databaseUrl);

db.on("error", (error) => {
    console.log("Database Error:", error);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/index.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.post("/api/workouts", (req, res) => {
    console.log("We hit the route", req.body);
    workoutmodel.create({}).then(function(data) {
        console.log("Just made a workout", data);
        res.json(data);
    });
});

app.get("/api/workouts", (req, res) => {
    workoutmodel.find({}).then(function(data) {
        res.json(data);
    });
});

// app.get("/notes/:id", (req, res) => {
//     db.notes.findOne({
//             _id: mongojs.ObjectId(req.params.id),
//         },
//         (error, data) => {
//             if (error) {
//                 res.send(error);
//             } else {
//                 res.send(data);
//             }
//         }
//     );
// });

// app.put("/notes/:id", (req, res) => {
//     db.notes.update({
//             _id: mongojs.ObjectId(req.params.id),
//         }, {
//             $set: {
//                 title: req.body.title,
//                 note: req.body.note,
//                 modified: Date.now(),
//             },
//         },
//         (error, data) => {
//             if (error) {
//                 res.send(error);
//             } else {
//                 res.send(data);
//             }
//         }
//     );
// });

// app.delete("/notes/:id", (req, res) => {
//     db.notes.remove({
//             _id: mongojs.ObjectID(req.params.id),
//         },
//         (error, data) => {
//             if (error) {
//                 res.send(error);
//             } else {
//                 res.send(data);
//             }
//         }
//     );
// });

// app.delete("/notes", (req, res) => {
//     db.notes.remove({}, (error, response) => {
//         if (error) {
//             res.send(error);
//         } else {
//             res.send(response);
//         }
//     });
// });

app.listen(3000, () => {
    console.log("App running on port 3000!");
});