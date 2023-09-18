const RedisPubSub = require('../observables/RedisPubSub');
const pubSub = new RedisPubSub();

let clients = [];
let types = new Set();

function subScribeTo(type, client) {
    if (!types.has(type)) {
        pubSub
            .removeAllListeners()
            .subscribeTo(type)
            //@TODO LOG and SEND error message Redis PUBSUB : interrupt on the admin side
            .on('error', err => console.log(err))
            .on('message_received', message => {
                sendEventsToAll(message);
            });
    }

    types.add(type);
    clients.push(client);
}

function unsubScribeFrom(type, clientId) {
    // Si on souhaitait unsubscribe du pubsub
    // pubSub.unsubscribeFrom(type).on('error', err => console.log(err));

    clients = clients.filter(client => client.id !== clientId);
}

function sendEventsToAll(message) {
    const data = JSON.parse(message);
    console.log('SENDING DATA', message);
    clients.forEach(client => {
        if (client.type === data.type) {
            // Le format de la string doit être respecté : le protocole l'exige
            client.response.write(`data: ${JSON.stringify(data)}\n\n`);
        }
    });
}

module.exports = { subScribeTo, unsubScribeFrom };
