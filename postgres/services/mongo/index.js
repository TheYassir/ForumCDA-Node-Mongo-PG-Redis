const createChannel = require('./createChannel');
const updateChannel = require('./updateChannel');

process.on('message', data => {
    const payload = data.data;

    if (data.type === 'channel') {
        createChannel(payload)
            .then(res => {
                process.send({ done: true, data: res });
                return res;
            })
            .catch(err => {
                process.send({ done: false, err: err });
                return err;
            });
    } else {
        updateChannel(payload)
            .then(res => process.send({ done: true, data: res }))
            .catch(err => process.send({ done: false, err: err }));
    }
});
