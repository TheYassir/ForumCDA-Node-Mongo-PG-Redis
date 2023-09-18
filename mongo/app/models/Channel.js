const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChannelSchema = new Schema(
    {
        id: { type: Number, unique: true },
        name: { type: String },
        slug: { type: String },
        description: { type: String },
        author: {
            type: {
                id: { type: Number },
                name: { type: String },
                email: { type: String },
                avatar: { type: String },
                created_at: { type: Date },
                updated_at: { type: Date },
            },
        },
        threads: [
            {
                id: {
                    type: Number,
                },
                channel_id: {
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
                slug: {
                    type: String,
                    required: true,
                },
                tags: [String],
                author: {
                    id: { type: Number },
                    name: { type: String },
                    email: { type: String },
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
                            avatar: { type: String },
                            created_at: { type: Date },
                            updated_at: { type: Date },
                        },
                        body: { type: String },
                        created_at: { type: Date },
                        updated_at: { type: Date },
                    },
                ],

                created_at: { type: Date },
                updated_at: { type: Date },
            },
        ],
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

// Channel.statics.tagsCount = async function () {
//     return await this.threads.aggregate([
//         { $unwind: '$tags' },
//         { $group: { _id: '$tags', count: { $sum: 1 } } },
//         { $sort: { count: -1, _id: 1 } },
//     ]);
// };

ChannelSchema.statics.getMonthlyArchives = async function () {
    return await this.aggregate([
        { $project: { month: { $substr: ['$created_at', 0, 7] } } },
        { $group: { _id: '$month', number: { $sum: 1 } } },
        { $sort: { _id: 1 } },
    ]);
};

ChannelSchema.statics.getDailyArchives = async function () {
    return await this.aggregate([
        { $project: { month: { $substr: ['$created_at', 0, 10] } } },
        { $group: { _id: '$month', number: { $sum: 1 } } },
        { $sort: { _id: 1 } },
    ]);
};

ChannelSchema.statics.getDailyThreads = async function () {
    return await this.aggregate([
        { $unwind: '$threads' },
        { $project: { day: { $substr: ['$threads.created_at', 0, 10] } } },
        { $group: { _id: '$day', number: { $sum: 1 } } },
        { $sort: { _id: 1 } },
    ]);
};
ChannelSchema.statics.getMonthlyThreads = async function () {
    return await this.aggregate([
        { $unwind: '$threads' },
        { $project: { day: { $substr: ['$threads.created_at', 0, 7] } } },
        { $group: { _id: '$day', number: { $sum: 1 } } },
        { $sort: { _id: 1 } },
    ]);
};

// Le premier argument de mongoose.model est le nom que l'on souhaite donner à la collection
module.exports = Channel = mongoose.model('channels', ChannelSchema);
