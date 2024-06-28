// userModel.js
const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: String,
  movies: [String],
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  location: { type: String, required: true },
  bio: { type: String },
  favoriteList: [{ type: String }],
  lists: [listSchema],
});

const User = mongoose.model('User', userSchema);
const MovieList = mongoose.model('MovieList', listSchema);

module.exports = { User, MovieList };
