const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "Review can not be empty!"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    selected: false,
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: "Tour",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

reviewSchema.pre(/^find/, function (next) {
  this.populate([
    {
      path: "user",
      select: "name photo",
    },
    {
      path: "tour",
      select: "name",
    },
  ]);

  next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
