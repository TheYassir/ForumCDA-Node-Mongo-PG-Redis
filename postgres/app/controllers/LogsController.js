const glob = require('glob');
const { request } = require('http');
const { createReadStream } = require('fs');
const { createGzip } = require('zlib');
const createLog = require('../factory/loggerFactory');
const { basename, join } = require('path');

const LogsController = {
    async index(req, res) {
        try {
            const ok = LogsController.zipAndSendFiles();

            if (ok) {
                console.log(ok);
                return res.status(200).json({ message: 'ok' });
            }

            throw Error('Something went wrong with zipping ');
        } catch (e) {
            res.status(500).json(e);
        }
    },

    zipAndSendFiles() {
        glob('./app/logs/*.log', function (err, files) {
            if (err) throw err;

            files.forEach(file => {
                // nommage de fichier nécessaire pour la sécurité
                const filename = basename(file);
                const toZip = join('./app/logs', filename);

                const options = {
                    hostname: 'logging',
                    port: 9050,
                    path: '/logs',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/octet-stream',
                        'Content-Encoding': 'gzip',
                        'X-Filename': filename,
                    },
                };

                const req = request(options, res => {
                    console.log(`Server Response : ${res.statusCode}`);
                });

                createReadStream(toZip)
                    .on('error', err =>
                        console.log('Erreur de stream ', err.message)
                    )
                    .pipe(createGzip())
                    .pipe(req)
                    .on('finish', () => {
                        createLog('log_info', {
                            class_name: 'A File has been archived',
                            method: 'GET',
                            ip: 'Zipping Service',
                            message: `${filename} has been zipped`,
                        });
                        console.log('DONE !');
                    });
            });
        })
            .on('match', match => console.log(match))
            .on('error', err => console.log('Attrapage erreur ', err.message));

        return true;
    },
};

module.exports = LogsController;
