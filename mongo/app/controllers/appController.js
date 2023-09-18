const Channel = require('../models/Channel');

const appController = {
    async index(req, res) {
        try {
            const channels = await Channel.find();
            res.status(200).json(channels);
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = appController;
