const Channel = require('../models/Channel');

const ThreadsController = {
    async index(req, res) {
        const threadsDailyArchives = await Channel.getDailyThreads();
        const threadsMonthlyArchives = await Channel.getMonthlyThreads();

        res.status(200).json({
            threadsDailyArchives,
            threadsMonthlyArchives,
        });
    },
};

module.exports = ThreadsController;
