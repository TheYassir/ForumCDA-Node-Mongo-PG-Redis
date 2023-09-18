const client = require('../../connexion');

const AppController = {
    async index(req, res) {
        try {
            const response = await client.json.get('testarticle:90:updated');

            res.status(200).json({ message: response });
        } catch (e) {
            res.status(500).json({ err: e.message });
        }
    },

    async update(req, res) {
        const { id } = req.params;

        try {
            await client.set(`channel:${id}:updated`, JSON.stringify(req.body));

            await client.publish(
                'threads',
                JSON.stringify({ threads: req.body, type: 'threads' })
            );

            console.log('miceky est content :) ');
            res.status(200).json({ message: 'OK FROM REDIS' });
        } catch (e) {
            console.error(e.message);
            res.status(500).json({ error: e.message });
        }
    },
};

module.exports = AppController;
