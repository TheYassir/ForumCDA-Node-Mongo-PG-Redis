exports.catchErrors = fn => {
    return function (req, res, next) {
        return fn(req, res, next).catch(next);
        // return fn(req, res, next).catch(err => next(err));
    };
};

exports.notFound = (req, res, next) => {
    const err = new Error('Not Found');

    err.status = 404;
    // Quand on passe un argument à next, un erreur est provoqué automatiquement
    next(err);
};

// Cette fonction servira à recueillir nos erreurs

// Accept : 'application/json , text/html
exports.collectErrors = (err, req, res, next) => {
    const status = err.status || 500;

    res.format({
        // 'text/html': () => {
        //     res.render('error', { message: err.message });
        // },
        'application/json': () => {
            res.status(status).json({ message: err.message });
        },
    });
};

// Cette fonction servira aussi à recueillir nos erreurs
exports.errorsCollector = async (err, req, res, next) => {
    const status = err.status || 500;
    console.log('GOING THRU errorsCollector', err.message);
    await fetch(`${process.env.REDIS_URL}/errors`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: err.message }),
    });

    if (!res.headersSent) {
        return res.format({
            // 'text/html': () => {
            //     res.render('error', { message: err.message, stack: err.stack });
            // },
            'application/json': () => {
                res.status(status).json({
                    message: err.message,
                    stack: err.stack,
                });
            },
        });
    }
};
