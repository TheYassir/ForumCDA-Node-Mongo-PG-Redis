const { Model, DataTypes, literal } = require('sequelize');
const Connexion = require('./Connexion');
const { getConnexion } = require('./db/getConnexion');

class User extends Model {}

User.init(
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
        email: {
            type: DataTypes.TEXT,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
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
        modelName: 'User',
        tableName: 'users',
    }
);

module.exports = User;
