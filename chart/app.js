const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/www'));

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/www', 'index.html'));
});

app.get('/chart', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/www/html', 'chart.html'))
});
app.get('/chart/bar', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/www/html', 'bar-chart.html'))
});
app.get('/chart/doughnut', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/www/html', 'doughnut-chart.html'))
});
app.get('/chart/line', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/www/html', 'line-chart.html'))
});


app.listen(3001, () => console.log('start'));