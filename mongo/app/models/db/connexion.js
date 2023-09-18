const mongoose = require('mongoose');

async function mongoConnexion() {
    // Avec Async / Await On fait des séries de try catch
    // On remplacera les try catch par des middlewares
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        mongoose.connection.on('error', err => {
            console.log(err.message);
        });

        return 'Mongoose connected ! 🔥';
    } catch (error) {
        console.log(error.message);

        process.exit(1);
    }
}

module.exports = mongoConnexion;
