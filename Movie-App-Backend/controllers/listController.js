const { User, MovieList } = require('../models/userModel');

const createList = async (req, res) => {
  const { username } = req.params;
  const { listName } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const newList = new MovieList({
      name: listName,
      movies: [],
    });

    user.lists.push(newList);
    await user.save();

    res.status(201).send(newList);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getLists = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).send(user.lists);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const deleteList = async (req, res) => {
  const { username, listId } = req.params;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send('User not found');
    }

    user.lists = user.lists.filter((list) => list._id.toString() !== listId);
    await user.save();

    res.status(200).send({ message: 'List deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const addMovieToList = async (req, res) => {
  const { username, listName } = req.params;
  const { movieId } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send('User not found');
    }

    let list = user.lists.find((list) => list.name === listName);

    if (!list) {
      return res.status(404).send('List not found');
    }

    if (list.movies.includes(movieId)) {
      return res.status(400).send('Movie already exists in the list');
    }

    list.movies.push(movieId);

    await user.save();

    res.status(201).send(user.lists);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const removeMovieFromList = async (req, res) => {
  const { username, listId, movieId } = req.params;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send('User not found');
    }

    let list = user.lists.find((list) => list.name === listId);

    if (!list) {
      return res.status(404).send('List not found');
    }

    const index = list.movies.indexOf(movieId);

    if (index === -1) {
      return res.status(404).send('Movie not found in the list');
    }

    list.movies.splice(index, 1);

    await user.save();

    res.status(200).send(user.lists);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports = {
  createList,
  getLists,
  deleteList,
  addMovieToList,
  removeMovieFromList,
};
