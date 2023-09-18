const { EventEmitter } = require('events');
const fs = require('fs');
const path = require('path');

class Logger extends EventEmitter {
    writable;
    static log_filename = path.join(
        __dirname,
        '../logs/' +
            new Date().toLocaleDateString().split('/').join('-') +
            '.log'
    );
    static log_error_prefix = '[ERROR]';
    static log_info_prefix = '[INFO]';

    constructor() {
        // init Emitter
        super();

        this.createFile();
        this.writable = fs.createWriteStream(Logger.log_filename, {
            flags: 'a',
        });
    }

    static createLogString(prefix, class_name, requestType, ip, message) {
        const date = new Date();

        let ret = `[${date.toLocaleString(
            'fr'
        )}],${prefix},${class_name},${ip},`;

        if (typeof message === 'string') {
            ret += message;
        } else {
            ret += JSON.stringify(message);
        }

        ret += '\n';

        return ret;
    }

    log_error(infos) {
        this.writable.write(
            Logger.createLogString(
                Logger.log_error_prefix,
                infos.class_name,
                infos.requestType,
                infos.ip,
                infos.message
            )
        );

        // Servira pour un interrupteur sur le client admin
        this.emit('error_received', infos.message);

        return this;
    }

    log_info(infos) {
        this.writable.write(
            Logger.createLogString(
                Logger.log_info_prefix,
                infos.class_name,
                infos.requestType,
                infos.ip,
                infos.message
            )
        );

        // ? emit something
        return this;
    }

    createFile() {
        if (!fs.existsSync(Logger.log_filename)) {
            const writable = fs.createWriteStream(Logger.log_filename, {
                flags: 'w',
            });

            writable.write('created_at,event,class,ip,action\n');
        }
    }
}

module.exports = Logger;

// Logger.createJsonLogString({ toto: 'content' });
