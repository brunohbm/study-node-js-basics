const express = require('express');

const friendsController = require('../controllers/friends.controller');

const friendsRouter = express.Router();

friendsRouter.use((req, resp, next) => {
    console.log(`IP: ${req.ip}`);
    next();
});
friendsRouter.get('/', friendsController.getFriends);
friendsRouter.post('/', friendsController.createFriend);
friendsRouter.get('/:id', friendsController.getFriendById);

module.exports = friendsRouter;