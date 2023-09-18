const { Model, DataTypes, literal } = require('sequelize');
const Connexion = require('./Connexion');

class Favorite extends Model {
    getFavoritable(options) {
        if (!this.favorited_type) return Promise.resolve(null);
        const mixinMethodName = `get${uppercaseFirst(this.favorited_type)}`;
        return this[mixinMethodName](options);
    }
}

// Spécifier primary Key aux trois champs permet d'avoir une clé primaire composite
// primary key (user_id, favorited_id, favorited_type)

// vérifier avec `psql -U USERNAME -d forum` puis :
// \d+ favorites;

Favorite.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        favorited_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        favorited_type: {
            type: DataTypes.STRING,
            primaryKey: true,
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
        modelName: 'Favorite',
        tableName: 'favorites',
    }
);

module.exports = Favorite;
