const { Model, DataTypes, literal } = require('sequelize');
const Connexion = require('./Connexion');

class Thread extends Model {
    path() {
        return `/threads/${this.channel.slug}/${this.id}`;
    }
}

Thread.init(
    {
        title: {
            type: DataTypes.STRING,
        },
        body: {
            type: DataTypes.TEXT,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        channel_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },
        // replies_count: {
        //     type: DataTypes.INTEGER,
        // },
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
        modelName: 'Thread',
        tableName: 'threads',
    }
);

module.exports = Thread;
