const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
});

require("./routes/workoutapi")(app);
require("./routes/htmlapi")(app);

app.post("/submit", ({ body }, res) => {
    User.create(body)
        .then((dbUser) => {
            res.json(dbUser);
        })
        .catch((err) => {
            res.json(err);
        });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
