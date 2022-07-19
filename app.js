const express = require('express');
const path = require('path');
const app = express();

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/dev/index.html');
})

app.use('/css', express.static(path.join(__dirname, 'dev/css')));
app.use('/js', express.static(path.join(__dirname, 'dev/js')));
app.use('/assets', express.static(path.join(__dirname, 'dev/assets')));
app.use('/vendor', express.static(path.join(__dirname, 'dev/vendor')));

app.listen(3000, function() {
    console.log('Server is running on http://localhost:3000');
})