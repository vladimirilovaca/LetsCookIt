const user = [{
    username: "Luchita",
    email: "luchita@letscookit.com",
    image:"/public/images/Luchitta.jpg",
    password: "12345678",
    isActive: true,
    bio: "I can cook with my wand. Common Ron, the correct way to said it is wingardium leviosa"
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
        .then((userDB) => {
            console.log(userDB)
            const postsToCreate = [...posts].map(post => {
                return {
                    ...post,
                    user: userDB[0]._id
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