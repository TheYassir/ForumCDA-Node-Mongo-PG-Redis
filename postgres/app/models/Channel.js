const { Model, DataTypes, literal } = require('sequelize');
const Connexion = require('./Connexion');

class Channel extends Model {}

Channel.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
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
        modelName: 'Channel',
        tableName: 'channels',
    }
);

module.exports = Channel;
