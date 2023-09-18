db.createUser({
    user: 'student',
    pwd: 'secret',
    roles: [{ role: 'readWrite', db: 'forum' }],
});
