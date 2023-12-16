const user = [{
    username: "Luchita",
    email: "luchita@letscookit.com",
    password: "12345678",
    isActive: true,
}];

const mongoose = require('mongoose');
const Post = require('../models/Post.model');
const User = require('../models/User.model');

const posts = require('../public/js/posts.json');
require('../config/db.config');

mongoose.connection.once('open', () => {
    mongoose.connection.dropDatabase()
        .then(() => {
            console.log('DB cleared');
        })
        .then(() => {
            return User.create(user);
        })
        .then((usersDB) => {
            const postsToCreate = [...posts].map(post => {
                return {
                    ...post,
                    user: usersDB[0]._id
                }
            })
            return Post.create(postsToCreate)
        })
        .then((postsCB) => {
            postsCB.forEach(post => console.log(`${post.name} has been created`))
        })
        .catch(err => console.error(err))
        .finally(() => {
            mongoose.connection.close()
                .then(() => {
                    console.log('End of seeds');
                })
                .catch((err) => console.error('Error while disconnecting', err))
                .finally(() => process.exit(0))
        })
})