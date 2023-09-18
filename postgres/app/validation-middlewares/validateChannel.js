const { check, validationResult } = require('express-validator');

const validateChannel = [
    check('name')
        .exists()
        .trim()
        .escape()
        .withMessage('le champ NAME est incorrect'),

    check('description')
        .exists()
        .trim()
        .escape()
        .withMessage('le champ DESCRIPTION est incorrect'),

    async function (req, res, next) {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            await fetch(`${process.env.REDIS_URL}/errors`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(errors.array()),
            });

            return res.status(400).json(errors.array());
        }

        return next();
    },
];

module.exports = validateChannel;
