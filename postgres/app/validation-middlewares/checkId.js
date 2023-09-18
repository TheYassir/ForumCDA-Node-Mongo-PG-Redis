const { param, validationResult } = require('express-validator');

const checkId = [
    param('id')
        .exists()
        .isInt()
        .withMessage("Id n'existe pas ou n'est pas au format correct"),

    function (req, res, next) {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        return next();
    },
];

module.exports = checkId;
