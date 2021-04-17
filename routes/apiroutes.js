const db = require("../models");
const router = require("express").Router();

router.put('/api/workouts/:id', ({ body, params }, res) => {
  db.Workout.findByIdAndUpdate(
    { _id: params.id },
    { $push: { exercises: body } })
    .then((updatedWorkout) => {
      res.json(updatedWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get('/api/workouts/range', (req, res) => {
  db.Workout.find({})
  .sort({ date: -1 })
  .then((workout) => res.json(workout))
  .catch((err) => res.json(err));
});

module.exports = router;