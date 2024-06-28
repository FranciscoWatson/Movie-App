// listRoutes.js
const express = require('express');
const listController = require('../controllers/listController');

const router = express.Router();

router.post('/:username/lists', listController.createList);
router.get('/:username/lists', listController.getLists);
router.delete('/:username/lists/:listId', listController.deleteList);
router.post('/:username/lists/:listName/addMovie', listController.addMovieToList);
router.delete('/:username/lists/:listId/movies/:movieId', listController.removeMovieFromList);

module.exports = router;
