const path = require("path");
// /public/photo.png . \public\photo.png

function getPictures(req, res) {
    const file = path.join(__dirname, '..', 'public', 'images', 'pinky guy.png');
    res.sendFile(file);
}

module.exports = {
    getPictures,
}