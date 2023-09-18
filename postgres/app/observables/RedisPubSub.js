const { EventEmitter } = require('node:events');

// TODO : Redis Streams pour envoyer les MAJ au lieu de PubSub ou  en plus ?.

// On se connecte une autre fois à redis: requis par la fonctionnalité PUBSUB, on pourrait cloner le client qu'on a déjà, mais en étant explicite c'est mieux compris
const { createClient } = require('redis');
const subscriber = createClient({
    socket: {
        host: 'redisserver',
        port: 6379,
    },
});

subscriber.connect().finally(() => console.log('redis connected'));

class RedisPubSub extends EventEmitter {
    constructor() {
        // ! On n'oublie pas super pour initialiser le constructeur de la classe parente
        super();
    }

    subscribeTo(type) {
        subscriber
            .subscribe(type, message => this.emit('message_received', message))
            .catch(err => this.emit('error', err.message))
            .then(() => console.log('SUBSCRIBED'));

        // ! Que l'on fasse une fonction ou une classe, on return this : il faut returner une instance de l'emitter, sinon on ne pourra pas enchainer avec .on()
        return this;
    }

    // Pas utilisé
    unsubscribeFrom(type) {
        subscriber
            .unsubscribe(type)
            .catch(err => this.emit('error', err.message))
            .then(() => console.log('UNSUBSCRIBED'));

        return this;
    }
}

module.exports = RedisPubSub;
