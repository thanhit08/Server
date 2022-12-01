let express = require('express');
let app = express();

var fs = require("fs");
var https = require("https");
let server = require('http').Server(app);
const servers = https.Server(app);
const {
    v4: uuidv4
} = require("uuid");

let io = require('socket.io')(servers, {
    cors: {
        origin: '*'
    }
});
let stream = require('./ws/stream');
let path = require('path');
let favicon = require('serve-favicon');

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});


io.of('/stream').on('connection', stream);

// server.listen(8690);
https
    .createServer({
            key: fs.readFileSync(path.resolve("src/assets/server.key")),
            cert: fs.readFileSync(path.resolve("src/assets/server.cert")),
        },
        app
    )
    .listen(8688, function() {
        console.log(
            "Example app listening on port 8688! Go to https://localhost:8688/"
        );
    });