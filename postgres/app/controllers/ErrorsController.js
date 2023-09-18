const { subScribeTo, unsubScribeFrom } = require('../factory/pubSubFactory');

const ErrorsController = {
    index(req, res) {
        const headers = {
            'Content-Type': 'text/event-stream',
            Connection: 'keep-alive',
            'Cache-Control': 'no-cache',
        };
        res.writeHead(200, headers);

        const clientId = Date.now();

        const newClient = {
            id: clientId,
            response: res,
            type: 'errors',
        };

        subScribeTo('errors', newClient);

        req.on('close', () => {
            console.log(`${clientId} Connection closed`);
            unsubScribeFrom('errors', clientId);
        });
    },
};

module.exports = ErrorsController;
