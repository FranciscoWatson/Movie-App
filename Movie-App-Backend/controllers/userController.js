// userController.js
const { User } = require('../models/userModel');

const registerUser = async (req, res) => {
  const { username, email, password, firstName, lastName, location, bio } = req.body;
  try {
    const user = new User({
      username,
      email,
      password,
      firstName,
      lastName,
      location,
      bio,
      favoriteList: [],
      lists: [],
    });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(401).send("Invalid username");
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).send('Invalid username or password');
    }

    res.status(200).send({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOneAndDelete({ username });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  const { username } = req.params;
  const { email, password, firstName, lastName, location, bio } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { username },
      { email, password, firstName, lastName, location, bio },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getFavorites = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).send(user.favoriteList);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const addFavorite = async (req, res) => {
  const { username } = req.params;
  const { movieId } = req.body;
  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send('User not found');
    }

    if (user.favoriteList.includes(movieId)) {
      return res.status(400).send('Movie already exists in the favorite list');
    }

    user.favoriteList.push(movieId);
    await user.save();

    res.status(201).send(user.favoriteList);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const deleteFavorite = async (req, res) => {
  const { username, movieId } = req.params;
  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send('User not found');
    }

    user.favoriteList = user.favoriteList.filter((id) => id !== movieId);
    await user.save();

    res.status(200).send(user.favoriteList);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
  getFavorites,
  addFavorite,
  deleteFavorite,
};
