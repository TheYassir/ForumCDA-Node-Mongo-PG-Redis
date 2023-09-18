const fetch = require('node-fetch');
const { Channel } = require('../../app/models');
const meta = require('./config');

async function updateChannel(data) {
    try {
        const channel = await Channel.findByPk(parseInt(data.channel_id), {
            include: { all: true, nested: true },
        });

        const c = channel.toJSON();

        //
        const url = `${process.env.MONGO_URL}/channels/${data.channel_id}`;

        const headers = new fetch.Headers(meta);

        const res = await fetch(url, {
            headers,
            method: 'PATCH',
            body: JSON.stringify(c),
        });

        if (res.ok) {
            const data = await res.json();

            return data;
        }
    } catch (e) {
        console.log(e.message);

        return { error: 'On a pas pu modifié les données chez mongo' };
    }
}

module.exports = updateChannel;
