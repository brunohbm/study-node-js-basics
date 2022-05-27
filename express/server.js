const path = require("path");
const express = require('express');
const friendsRouter = require('./routes/friends.router');
const messagesRouter = require('./routes/messages.router');

const PORT = 3000;
const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json())

// Friends routes
app.use('/friends', friendsRouter);

// Message routes
app.use('/messages', messagesRouter);

// Site server
app.use(
    '/site',
    express.static(
        path.join(__dirname, 'public')
    )
);

// Site page route
app.get('/', (req, res) => {
    res.render('index', {
        h1: 'Site H1',
        title: 'Site Title'
    });
});

// Test page route
app.get('/test', (req, res) => {
    res.render('test', {
        h1: 'Test do layout.hbs',
        title: 'Test do layout.hbs'
    });
});

app.listen(PORT, () => {
    console.log('It is alive!!!!!!!?');
})
