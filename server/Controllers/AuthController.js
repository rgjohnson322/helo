const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');
        const foundUser = await db.auth.checkForUsername(username);

        if(foundUser[0]) {
            res.status(403).json("Username taken.");
            
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const newUser = await db.auth.registerUser(username, hash);
            req.session.user = {
                user_id: newUser[0].user_id,
                username: newUser[0].username,
                profile_pic: newUser[0].profile_pic
            }
            res.status(200).json(req.session.user);
        }
    },

    login: async(req, res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');

        const foundUser = await db.auth.checkForUsername(username);
        console.log(foundUser)
        if(!foundUser[0]) {
            res.status(403).json("Username/password incorrect.")
        } else {
            const isAuthenticated = bcrypt.compareSync(password, foundUser[0].password);

            if(!isAuthenticated) {
                console.log("hit")
                res.status(403).json('Username/password incorrect.');

            } else {
                req.session.user = {
                    user_id: foundUser[0].user_id,
                    username: foundUser[0].username,
                    profile_pic: foundUser[0].profile_pic
                }
            }
            res.status(200).json(req.session.user);
        }
    },
    
    getUser: (req, res) => {
        console.log(req.session.user);
        if (req.session.user) {
            res.status(200).json(req.session.user.user_id);
        } else {
            res.sendStatus(401);
        }
    },
    updateUser: async (req, res) => {
        const {profile_pic} = req.body
        const {user_id} = req.session.user
        const db = req.app.get('db')
        const newPic = db.auth.updateUser(profile_pic, user_id)
        res.status(200).json(newPic)
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}