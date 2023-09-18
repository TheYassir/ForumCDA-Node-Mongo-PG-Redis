require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./app/routers');

app.use(cors());

app.use(express.json({ extended: false, limit: '16mb' }));

app.use(router);

app.set('base_url', process.env.BASE_URL);
app.set('port', process.env.PORT);

app.listen(app.get('port'), _ => {
    console.log(`${app.get('base_url')}:${app.get('port')}`);
});
