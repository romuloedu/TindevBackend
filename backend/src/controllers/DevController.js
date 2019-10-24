const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async index(req, res) {
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        // Filtro para excluir usuários com like ou dislike.
        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes } }
            ]
        });

        return res.json(users);
    },

    async store(req, res) {
        // Pega o nome de usuário passado.
        const { username } = req.body;

        // Verifica se já existe um usuário no banco de dados 
        // para o parâmetro informado.
        const userExists = await Dev.findOne({ user: username });

        // Se já existir, retorna os dados do usuário.
        if (userExists) {
            return res.json(userExists);
        }

        // Busca os dados na API do GitHub.
        const response = await axios.get(`https://api.github.com/users/${username}`);

        // Busca os dados que eu vou salvar.
        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        });

        // Retorna os dados do usuário.
        return res.json(dev);
    }
}