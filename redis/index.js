require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./app/routers');

app.use(cors('*'));

app.use(express.json({ extended: true, limit: '16mb' }));

app.use(router);

app.set('port', process.env.PORT);
app.set('app_url', process.env.BASE_URL);

app.listen(app.get('port'), () => {
    console.log(`listening on ${app.get('app_url')}/${app.get('port')}`);
});
