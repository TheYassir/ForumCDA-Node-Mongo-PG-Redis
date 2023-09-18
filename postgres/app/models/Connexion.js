const getConnexion = require('./db/getConnexion');

class Connexion {
    static get connexionInstance() {
        return getConnexion();
    }
}

module.exports = Connexion;
