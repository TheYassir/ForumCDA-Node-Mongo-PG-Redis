const { basename, join } = require('path');
const { createWriteStream, createReadStream } = require('fs');
const { Transform } = require('stream');
const glob = require('glob');
const { parse } = require('csv-parse');
const { createGunzip } = require('zlib');
const fetch = require('node-fetch');

// Ca devrait être ailleurs, mais c'est plus simple à expliquer aux apprenants quand on a pas besoin de changer de fichiers.
// Il s'agit de Transform Stream, qui permettent d'intercepter les données d'un stream et de les modifier.
// Dans l'exemple plus bas, on filtre les données des logs selon le type de log (ERROR ou INFO) et on les compte
// Le client recevra le compte total de ligne filtrées ainsi que les lignes elle même, sous forme de csv.
class FilterByEvent extends Transform {
    constructor(event, options = {}) {
        options.objectMode = true;
        super(options);
        this.event = event;
    }

    _transform(record, enc, cb) {
        if (record.event === this.event) {
            this.push(record);
        }
        cb();
    }
}

class CountActions extends Transform {
    constructor(options = {}) {
        options.objectMode = true;
        super(options);
        this.total = 0;
        this.events = [];
    }

    _transform(record, enc, cb) {
        this.total += 1;
        this.events.push(record.action);
        cb();
    }
    _flush(cb) {
        this.push(this.total.toString() + '\n');
        this.push(this.events.join('\n'));

        cb();
    }
}

const AppController = {
    async init(req, res) {
        try {
            const response = await fetch(`${process.env.PG_URL}/logs`);
            if (response.statusText === 'OK') {
                return res
                    .status(200)
                    .json({ message: 'Les logs ont été générés' });
            }
            throw Error('Houston, On a un problème');
        } catch (e) {
            res.status(400).json(e);
        }
    },
    /**
     * TODO un cron qui va chercher les logs, les dézippe et les parse en csv
     */
    index(req, res) {
        try {
            const filename = basename(req.headers['x-filename']);
            const destination = join('received', filename);

            req.pipe(createGunzip())
                .pipe(createWriteStream(destination))
                .on('finish', () => {
                    res.writeHead(201, { 'Content-Type': 'text/plain' });
                    res.end('OK\n');
                    console.log('File saved: ' + destination);
                })
                .on('error', err => {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end(`NOT OK\n ${err}`);
                });
        } catch (e) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end(`NOT OK\n ${e}`);
        }
    },
    async show(req, res) {
        /**
         * TODO envoyer les logs au clients admin
         */
        res.status(200).json({ message: 'ok' });
    },

    parseCsv(req, res) {
        try {
            const csvParser = parse({ columns: true });

            const headers = {
                'Content-Type': 'text/plain',
            };
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206
            res.writeHead(206, headers);

            glob('./received/*.log', function (err, files) {
                if (err) throw err;

                files.forEach(file => {
                    // nommage de fichier nécessaire pour la sécurité
                    const filename = basename(file);
                    const toZip = join('./received', filename);

                    console.log('TOZIP', toZip);
                    createReadStream(toZip)
                        .on('error', error => console.log('ERROR', error))
                        .pipe(csvParser)
                        .pipe(new FilterByEvent('[INFO]'))
                        .pipe(new CountActions())
                        .pipe(res);
                });
            })
                .on('match', match => console.log(match))
                .on('error', err =>
                    console.log('Attrapage erreur ', err.message)
                );
        } catch (e) {
            console.log(e);
            res.status(400).json(e);
        }
    },
};

module.exports = AppController;
