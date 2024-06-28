// userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.delete('/:username', userController.deleteUser);
router.put('/:username', userController.updateUser);
router.get('/:username/favorites', userController.getFavorites);
router.post('/:username/addFavorites', userController.addFavorite);
router.delete('/:username/favorites/:movieId', userController.deleteFavorite);

module.exports = router;
