const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/movieapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

// Endpoint para crear una lista de películas
app.post('/api/users/:username/lists', async (req, res) => {
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
});

// Endpoint para obtener las listas de películas de un usuario
app.get('/api/users/:username/lists', async (req, res) => {
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
});

// Endpoint para eliminar una lista de películas de un usuario
app.delete('/api/users/:username/lists/:listId', async (req, res) => {
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
});

// Endpoint para agregar una película a una lista de películas específica de un usuario
app.post('/api/users/:username/lists/:listId/addMovie', async (req, res) => {
  const { username, listId } = req.params;
  const { movieId } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send('User not found');
    }

    let list = user.lists.find((list) => list._id.toString() === listId);

    if (!list) {
      return res.status(404).send('List not found');
    }

    list.movies.push(movieId);

    await user.save();

    res.status(201).send(user.lists);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Endpoint para eliminar una película de una lista específica de un usuario
app.delete('/api/users/:username/lists/:listId/movies/:movieId', async (req, res) => {
  const { username, listId, movieId } = req.params;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send('User not found');
    }

    let list = user.lists.find((list) => list._id.toString() === listId);

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
});

// Endpoint para registrar un nuevo usuario
app.post('/api/register', async (req, res) => {
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
    res.status(500).send(error);
  }
});

// Endpoint para iniciar sesión
app.post('/api/login', async (req, res) => {
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
});

// Endpoint para eliminar un usuario
app.delete('/api/users/:username', async (req, res) => {
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
});

// Endpoint para actualizar información de usuario
app.put('/api/users/:username', async (req, res) => {
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
});

// Endpoint para agregar una película a la lista de favoritos de un usuario
app.post('/api/users/:username/favorites', async (req, res) => {
  const { username } = req.params;
  const { movieId } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send('User not found');
    }

    user.favoriteList.push(movieId);
    await user.save();

    res.status(201).send(user.favoriteList);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Endpoint para eliminar una película de la lista de favoritos de un usuario
app.delete('/api/users/:username/favorites/:movieId', async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
