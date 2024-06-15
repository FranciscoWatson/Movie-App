const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/movieapp');

const listSchema = new mongoose.Schema({
    name: String,
    movies: [String]
});

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    location: { type: String, required: true},
    bio: { type: String},
    lists: [listSchema]
});

const User = mongoose.model('User', userSchema);
const MovieList = mongoose.model('MovieList', listSchema);

// Endpoint para crear una lista
app.post('/api/users/:username/lists', async (req, res) => {
    const { username } = req.params;
    const { listName} = req.body;

    try {
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const newList = new MovieList({
            name: listName,
            movies: []
        })

        user.lists.push(newList);
        await user.save();

        res.status(201).send(newList);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Endpoint para obtener las listas de peliculas de un usuario
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

app.delete('/api/users/:username/lists/:listId', async (req, res) => {
    const { username, listId } = req.params;

    try {
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(404).send('User not found');
        }

        const updatedLists = user.lists.filter(list => list._id.toString() !== listId);
        user.lists = updatedLists;
        await user.save();

        res.status(200).send({ message: 'List deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

//agregar pelicular a lista
app.post('/api/users/:username/:listId/', async (req, res) => {
    const { username, listId } = req.params;
    const { movieId} = req.body;

    try {
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(404).send('User not found');
        }

        let list = user.lists.find(list => list._id.toString() === listId);

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
        // Buscar al usuario por username
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Buscar la lista por su _id dentro del array lists del usuario
        let list = user.lists.find(list => list._id.toString() === listId);

        if (!list) {
            return res.status(404).send('List not found');
        }

        // Encontrar la posición de la película dentro del array de movies de la lista
        const index = list.movies.indexOf(movieId);

        if (index === -1) {
            return res.status(404).send('Movie not found in the list');
        }

        // Eliminar la película del array de movies de la lista
        list.movies.splice(index, 1);

        // Guardar al usuario actualizado
        await user.save();

        // Devolver las listas actualizadas del usuario
        res.status(200).send(user.lists);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


app.post('/api/register', async (req, res) => {
    const { username, email, password, firstName, lastName, location, bio } = req.body;

    try {
        const user = new User({ username, email, password, firstName, lastName, location, bio, lists:[] });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            return res.status(401).send('Invalid username or password');
        }

        res.status(200).send({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/api/users/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOneAndDelete({ username });
        
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

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
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
