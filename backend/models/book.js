// @ts-nocheck
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const bookSchema = mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String },
  year: { type: Number },
  genre: { type: String },
  rating: [{ userId: String, grade: Number }],
  averageRating: { type: Number },
});

module.exports = mongoose.model("User", userSchema);
module.exports = mongoose.model("Book", bookSchema);
