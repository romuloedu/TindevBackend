// Importa as dependências.
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

// Isola o servidor htto.
const app = express();

// Informa que o server atual vai habilitar os serviços HTTP.
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};

// Habilita o suporte à sockets.˜
io.on('connection', socket => {
    const { user } = socket.handshake.query;
    connectedUsers[user] = socket.id;
});

// Inicializa o acesso ao banco de dados.
mongoose.connect('mongodb+srv://tindev:tindev@cluster0-zqp5r.mongodb.net/tindev?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

// Habilita o CORS.
app.use(cors());

// Habilita o suporte a JSON.
app.use(express.json());

// Usa as rotas configuradas.
app.use(routes);

// Executa o servidor na porta informada.
server.listen(3333);
