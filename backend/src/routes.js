// Importa as dependências.
const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

// Cria o objeto que armazenará as rotas.
const routes = express.Router();

// Prepara a rota GET e cria a rota de acesso inicial.
// routes.get('/', (req, res) => {
//     return res.json({ message: `Olá, ${req.query.name}!` });
// });

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

module.exports = routes; 