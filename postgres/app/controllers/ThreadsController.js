const child_proc = require('node:child_process');
const { Thread } = require('../models');
const { subScribeTo, unsubScribeFrom } = require('../factory/pubSubFactory');
const createLog = require('../factory/loggerFactory');

const ThreadsController = {
    async store(req, res) {
        // @TODO: validation middleware
        const { title, body, tags, channel_id, user_id } = req.body;

        // changer le nom d'une des props pour provoquer une erreur et tester le pubsub cote admin
        const thread = await Thread.create({
            title,
            body,
            tags,
            channel_id,
            user_id,
        });
        res.status(201).json(thread);

        // * As always : we delegate to a fork :)

        ThreadsController.runMongoServices(thread, req);
    },

    /**
     * Méthode appelée par le client au chargement de la page d'accueil, permet de subscribe à REDIS et ouvre une connexion de type Server Sent Event
     * qui envoie les données issues de REDIS
     * @param request
     * @param response
     */
    eventsHandler(request, response) {
        // Ce morceau de code permet les SSE
        const headers = {
            'Content-Type': 'text/event-stream',
            Connection: 'keep-alive',
            'Cache-Control': 'no-cache',
        };
        response.writeHead(200, headers);

        const clientId = Date.now();

        const newClient = {
            id: clientId,
            response: response,
            type: 'threads',
        };

        subScribeTo('threads', newClient);

        request.on('close', () => {
            console.log(`${clientId} Connection closed`);
            unsubScribeFrom('threads', clientId);
        });
    },

    runMongoServices(thread, req, type = 'thread') {
        // On fait un nouveau process
        const sub = child_proc.fork('./services/mongo/index.js');

        sub.send({ data: thread, type: type });

        sub.on('message', message => {
            if (message.err) {
                // @TODO LOG and SEND error message Redis PUBSUB : interrupt on the admin side : le logger pourrait peut-être le faire ?
                createLog('log_error', {
                    class_name: 'Postgres/ThreadsController',
                    method: req.method,
                    ip: req.ip,
                    message: message.err,
                });
            } else {
                // @TODO : LOG THE ACTION : Voir si on peut le faire avec pg_notify()
                createLog('log_info', {
                    class_name: 'Postgres/ThreadsController',
                    method: req.method,
                    ip: req.ip,
                    message: `${message.data.message} Thread Created`,
                });
            }

            sub.disconnect();
        });
    },
};

module.exports = ThreadsController;
