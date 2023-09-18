const { Model, DataTypes, literal } = require('sequelize');
const Connexion = require('./Connexion');

class Reply extends Model {}

Reply.init(
    {
        thread_id: {
            type: DataTypes.INTEGER,
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        body: {
            type: DataTypes.TEXT,
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
        modelName: 'Reply',
        tableName: 'replies',
    }
);

module.exports = Reply;
