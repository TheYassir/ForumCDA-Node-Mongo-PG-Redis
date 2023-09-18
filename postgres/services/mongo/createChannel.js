const fetch = require('node-fetch');
const { Channel } = require('../../app/models');
const meta = require('./config');

async function createChannel(data) {
    try {
        const channel = await Channel.findByPk(data.id, {
            include: { all: true, nested: true },
        });
        const t = channel.toJSON();

        const url = `${process.env.MONGO_URL}/channels`;

        const headers = new fetch.Headers(meta);

        const res = await fetch(url, {
            headers,
            method: 'POST',
            body: JSON.stringify(t),
        });

        if (res.ok) {
            const data = await res.text();
            return data;
        }
    } catch (e) {
        console.log(e);
        return { error: 'On a pas pu enregistrer les données chez mongo' };
    }
}

module.exports = createChannel;
