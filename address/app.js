const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/www'));

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/www', 'index.html'));
});

app.listen(3001, () => console.log('start'));