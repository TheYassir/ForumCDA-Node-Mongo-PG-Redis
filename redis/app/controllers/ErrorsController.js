const client = require('../../connexion');

const ErrorsController = {
    async index(req, res) {
        console.log('PUBLISHING ERRORS ', req.body);
        await client.publish(
            'errors',
            JSON.stringify({ errors: req.body, type: 'errors' })
        );

        res.status(200).json({ message: 'DONE !' });
    },
};

module.exports = ErrorsController;
