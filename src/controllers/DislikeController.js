const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        // Usuário logado.
        const { user } = req.headers;

        //Usuário que receberá o like.
        const { devId } = req.params;

        // Busca as instâncias dos usuários.
        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        // Se o usuário não existir...
        if (!targetDev) {
            return res.status(400).json({ error: 'Dev not exists' });
        }

        // Adiciona o like à lista do usuário logado.
        loggedDev.dislikes.push(targetDev._id);

        // Persiste as informações no banco de dados.
        await loggedDev.save();

        return res.json(loggedDev);
    }
};