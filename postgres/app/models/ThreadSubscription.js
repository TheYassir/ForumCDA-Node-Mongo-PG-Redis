const { Model, DataTypes, literal } = require('sequelize');
const Connexion = require('./Connexion');

class ThreadSubscription extends Model {}

ThreadSubscription.init(
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize: Connexion.connexionInstance,
        modelName: 'ThreadSubscription',
        tableName: 'thread_subscriptions',
    }
);

module.exports = ThreadSubscription;
