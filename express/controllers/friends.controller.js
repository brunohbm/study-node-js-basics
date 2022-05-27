const model = require('../models/friends.model');

function createFriend(req, res) {
    if (!req.body.name) {
        res.status(400).json({
            error: 'Não informou o nome cabeçudo!',
        });
        return;
    }

    const newFriend = {
        id: model.length,
        name: req.body.name,
    };

    model.push(newFriend);

    res.json(newFriend);
};

function getFriends(req, res) {
    res.status(200).json(model);
}

function getFriendById(req, res) {
    const friendById = model[req.params.id];

    if (friendById) {
        res.status(200).json(friendById);
        return;
    }

    res.status(404).json({ error: 'Tem nada aqui com esse id não mano!' });
}

module.exports = {
    getFriends,
    createFriend,
    getFriendById,
};