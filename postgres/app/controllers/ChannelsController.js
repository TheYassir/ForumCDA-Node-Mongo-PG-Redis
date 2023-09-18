const child_proc = require('node:child_process');
const { Channel } = require('../models');
const slugify = require('../../helpers/slugify');
const createLog = require('../factory/loggerFactory');

const ChannelsController = {
    async store(req, res) {
        // ? @TODO challenge : valider les champs du form avec un middleware (rafraichir la mémoire sur les middlewares)

        const { name, description, user_id } = req.body;
        const slug = slugify(name);

        // changer le nom d'une des props pour provoquer une erreur et tester le pubsub cote admin
        const chan = await Channel.create({
            name,
            description,
            slug,
            user_id,
        });

        createLog('log_info', {
            class_name: 'Channel',
            method: req.method,
            ip: req.ip,
            message: 'Channel Created',
        });

        res.status(201).json({ chan });

        // * Envoyer tout ça dans MongoDB : On délègue à un fork
        ChannelsController.runMongoServices(chan);
    },

    runMongoServices(chan, type = 'channel') {
        const sub = child_proc.fork('./services/mongo/index.js');

        // * sending message to subprocess
        sub.send({ data: chan, type: type });

        // * listening to message from subprocess
        sub.on('message', message => {
            if (message.err) {
                console.log(message.err);
                // @TODO LOG and SEND error message Redis PUBSUB : interrupt on the admin side
            }
            // @TODO IRL : LOG THE ACTION : Voir si on peut le faire avec pg_notify()
            // * Quand on a reçu la réponse on kill du fork
            sub.disconnect();
        });
    },
};

module.exports = ChannelsController;
