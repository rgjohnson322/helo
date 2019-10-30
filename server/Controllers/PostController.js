module.exports = {

    getPosts: async (req, res) => {
        const db = req.app.get('db');
        const posts = await db.Posts.getPosts(); 
        res.status(200).json(posts);
    },
    getPostsById: async (req, res) => {
        const db = req.app.get('db');
        const {post_id} = req.query;
        const post = await db.Posts.getPostsById(post_id); 
        res.status(200).json(post);
    },
    createPost: async (req, res) => {
        const {user_id} = req.session.user
        const {title, img, content} = req.body
        const db = req.app.get('db')
        const posts = await db.Posts.createPost(user_id, title, img, content)
        res.status(200).json(posts)
    },
    getPostByTitle: async(req, res) => {
        const { title } = req.query;
        const db = req.app.get("db");
        const posts = await db.Posts.getPostByTitle(`${title}%`);
        console.log(posts)
        res.status(200).json(posts);
    }
}