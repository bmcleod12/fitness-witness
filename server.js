const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {  
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

db.Workout.create({
  day: new Date().setDate(new Date().getDate()-10),
  exercises: [
    {
      type: "resistance",
      name: "Bicep Curl",
      duration: 20,
      weight: 100,
      reps: 10,
      sets: 4
    }
  ]
})
.then(newworkout => {
  console.log(newworkout);
})
.catch(({ message }) => {
  console.log(message);
});

app.use(require("./routes/apiroutes"));
app.use(require("./routes/htmlroutes"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
