const fetch = require('node-fetch');
const Channel = require('../models/Channel');
const { createClient } = require('redis');
const client = createClient({
    socket: {
        host: 'redisserver',
        port: 6379,
    },
});

client.connect().finally(() => null);

const ChannelsController = {
    /**
     *
     * @description Returns a JSON list of resources
     * @param req
     * @param res
     */
    async index(req, res) {
        try {
            // Comparaison de vitesse entre redis et MongoDB
            // let channels = await client.get('channel:90:updated');
            // res.status(200).json([channels]);

            let channels = await Channel.find();

            res.status(200).json(channels);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },

    /**
     *
     * @description Store a ressources in DB, returns the newly created resource
     * @param req
     * @param res
     */
    async store(req, res) {
        // ? Valider req.body
        // * C'est fait sur le serveur PostgreSQL :)
        try {
            const chan = await Channel.create(req.body);

            // OBSERVER ici
            res.status(201).json({ chan });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    /**
     *
     * @description Send data to Redis and Returns a <json> channel with threads
     * @param req
     * @param res
     */
    async show(req, res) {
        const remote = req.ip; // * SEND TO REDIS FOR COUNTING VISITS
        console.log(req.params.channelId);
        try {
            const channel = await Channel.findOne({
                id: req.params.channelId,
            });

            res.status(200).json(channel);
        } catch (err) {
            console.log(err);
        }
    },

    /**
     * @description Update a resource
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async update(req, res) {
        try {
            const id = req.body.id;

            // ! Piège avec cette méthode : elle retourne un document mongoDB, pas un JSON : Bon pour les faire galérer sur un atelier ?
            const c = await Channel.findOneAndUpdate({ id }, req.body, {
                new: true,
                rawResult: true,
            });
            // on récupère un JSON
            const doc = await Channel.findById(c.value._id).exec();

            // SEND DOC TO REDIS
            const meta = {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=UTF-8',
            };
            const headers = new fetch.Headers(meta);
            const url = `${process.env.REDIS_URL}/updatedChannel/${id}`;

            const response = await fetch(url, {
                headers,
                method: 'PATCH',
                body: JSON.stringify(doc),
            });

            if (response.ok) {
                const data = await response.json();

                res.status(200).json(data);
            }
        } catch (e) {
            res.status(500).json({
                err: 'Something went horribly wrong on our side ! Please try again later',
            });
        }
    },

    async archives(req, res) {
        const channelsMonthlyArchives = await Channel.getMonthlyArchives();
        const channelsDailyArchives = await Channel.getDailyArchives();

        res.status(200).json({
            channelsMonthlyArchives,
            channelsDailyArchives,
        });
    },
};

module.exports = ChannelsController;
