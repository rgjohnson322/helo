require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express();
const {register, login, getUser, logout, updateUser} = require('./Controllers/AuthController');
const {createPost, getPosts, getPostsById, getPostByTitle} = require('./Controllers/PostController');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log(':P')
})

//auth
app.post('/auth/register', register);
app.post('/auth/login', login);
app.get('/auth/user', getUser);
app.post('/auth/logout', logout);
app.put('/auth/profilepic', updateUser)
//posts
app.post('/api/posts', createPost);
app.get('/api/posts', getPosts);
app.get('/api/post/post_id', getPostsById);


app.get("/api/posts/title", getPostByTitle);

app.listen(SERVER_PORT, () => 
console.log('Listening on port', SERVER_PORT));