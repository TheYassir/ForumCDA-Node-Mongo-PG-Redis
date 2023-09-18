// Création d'un utilisateur et de la base de données forum dans mongoDB
//
// 1. : On créé / switch sur la BDD forum
'use forum'; // Dans Mongo Shell

// Ou
// use('forum') // dans l'extension VSCODE

// 2. : On crée l'utilisateur avec les droits read / write sur la BDD forum
db.createUser({
    user: 'laurent',
    pwd: 'password',
    roles: [{ role: 'readWrite', db: 'forum' }],
});
