const EventEmitter = require('events');
const celebrity = new EventEmitter();

celebrity.on("race", (result, teste) => {
    console.log(result);
});

celebrity.on("race", (result, teste) => {
    console.log(result + 1);
});

celebrity.emit("race", "win");

process.on("exit", result => {
    console.log(result);
});