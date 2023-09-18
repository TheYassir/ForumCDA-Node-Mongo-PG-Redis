const Sequelize = require('sequelize');

function getConnexion() {
    const dbName =
        process.env.NODE_ENV === 'test'
            ? process.env.TEST_DB_NAME
            : process.env.DB_NAME;

    return new Sequelize(
        dbName,
        process.env.DB_USERNAME,
        process.env.DB_PASSWD,
        {
            define: {
                createdAt: 'created_at',
                updatedAt: 'updated_at',
            },
            host: process.env.DB_HOST,
            dialect: process.env.DB_ENV,
            logging: false,
        }
    );
}

module.exports = getConnexion;
