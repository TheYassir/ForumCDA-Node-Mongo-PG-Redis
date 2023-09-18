require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandlers = require('./handlers/errorHandlers');
const app = express();

const router = require('./app/routers');

app.use(cors('*'));

const options = {
    extended: false,
    limit: '10mb',
};

app.use(express.json(options));

app.use('/api', router);

// on gènere les 404
app.use(errorHandlers.notFound);

// On afficher plus d'infos à propos des erreurs quand on est development
if (app.get('env') === 'development') {
    app.use(errorHandlers.errorsCollector);
} else {
    // Les messages d'erreurs pour la prod
    app.use(errorHandlers.collectErrors);
}

app.set('base_url', process.env.BASE_URL);
app.set('port', process.env.PORT);

app.listen(app.get('port'), _ => {
    console.log(`${app.get('base_url')}:${app.get('port')}`);
});
