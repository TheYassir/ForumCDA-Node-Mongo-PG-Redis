const User = require('./User');
const Thread = require('./Thread');
const Reply = require('./Reply');
const Favorite = require('./Favorite');
const ThreadSubscription = require('./ThreadSubscription');
const Channel = require('./Channel');

// Faire les associations ici
// Channel -> Thread
Channel.hasMany(Thread, {
    foreignKey: 'channel_id',
    as: 'threads',
});

Channel.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'author',
});

User.hasMany(Channel, {
    foreignKey: 'user_id',
    as: 'channels',
});

Thread.belongsTo(Channel, {
    foreignKey: 'channel_id',
    as: 'channel',
});

// Thread => User
Thread.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'author',
});

User.hasMany(Thread, {
    foreignKey: 'user_id',
    as: 'threads',
});

// Thread => Reply
Thread.hasMany(Reply, {
    foreignKey: 'thread_id',
    as: 'replies',
});

Reply.belongsTo(Thread, {
    foreignKey: 'thread_id',
    as: 'thread',
});

// Faire penser à re-créér la BDD quand vous faites des associations

module.exports = { User, Thread, Reply, Favorite, ThreadSubscription, Channel };
