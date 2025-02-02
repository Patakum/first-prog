const express = require('express');
const router = express.Router();
const userController = require('./userController')

router.post('/user', userController.createUser);

router.get('/users', userController.getUsers);

router.get('/user/:id', userController.getUserById);

router.patch('/user/:id/name', userController.changeName);

router.patch('/user/:id/profile', userController.changeProfile);

router.delete('/user/:id', userController.deleteUser);

router.delete('/user/:id/profile', userController.deleteProfile);

router.post('/user/:id/favorite', userController.createFavorite);

router.get('/user/:id/favorites', userController.getFavorite);

router.delete('/user/:id/favorite/:favId', userController.deleteFav);

router.patch('/user/:id/favorite/:favId/name', userController.updateFavName);

router.delete('/user/:id/favorite/:favId/image', userController.deleteFavPic);


module.exports = router;