const Logger = require('../observables/Logger');

function createLog(method, args) {
    const logger = new Logger();

    logger
        .on('error', err => console.log('Envoyer cette erreur ', err))
        .on('error_received', err => console.log('Envoyer cette erreur ', err))
        [method](args);
}

module.exports = createLog;
