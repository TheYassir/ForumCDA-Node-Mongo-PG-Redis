const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThreadSchema = new Schema(
    {
        id: {
            type: Number,
        },
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: 'Votre thread doit dire qqchose :/',
        },
        tags: [String],
        author: {
            id: { type: Number },
            name: { type: String },
            email: { type: String },
            password: { type: String },
            avatar: { type: String },
            created_at: { type: Date },
            updated_at: { type: Date },
        },
        replies: [
            {
                id: { type: Number },
                author: {
                    id: { type: Number },
                    name: { type: String },
                    email: { type: String },
                    password: { type: String },
                    avatar: { type: String },
                    created_at: { type: Date },
                    updated_at: { type: Date },
                },
                body: { type: String },
                created_at: { type: Date },
                updated_at: { type: Date },
            },
        ],
        channel: {
            id: { type: Number },
            name: { type: String },
            slug: { type: String },

            created_at: { type: Date },
            updated_at: { type: Date },
        },
        created_at: { type: Date },
        updated_at: { type: Date },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

ThreadSchema.statics.tagsCount = async function () {
    return await this.aggregate([
        { $unwind: '$tags' },
        { $group: { _id: '$tags', count: { $sum: 1 } } },
        { $sort: { count: -1, _id: 1 } },
    ]);
};

ThreadSchema.statics.getArchives = async function () {
    return await this.aggregate([
        { $project: { month: { $substr: ['$created_at', 0, 7] } } },
        { $group: { _id: '$month', number: { $sum: 1 } } },
        { $sort: { _id: 1 } },
    ]);
};

// Le premier argument de mongoose.model est le nom que l'on souhaite donner à la collection
module.exports = MongoThread = mongoose.model('threads', ThreadSchema);
