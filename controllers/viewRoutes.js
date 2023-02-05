const router = require('express').Router()
const { Post, User, Comment } = require('../models')

router.get('/', (req, res) => {
    try {
        res.render('landingpage', {
            logged_in: req.session.logged_in
        })
    }
    catch (error) {
        res.status(500).json(err)
    }

})

router.get('/posts', async (req, res) => {
    try {
        let posts = await Post.findAll({
            include: [
                {
                    model: Comment,
                    include: [{ model: User }]
                },
                { model: User }],
            order: [['createdAt', 'DESC']],
        })

        posts = posts.map(post => {
            const postData = post.get({ plain: true })
            return {
                ...postData,
                commentCount: postData.comments.length,
                commentContent: postData.comments.map(comment => {
                    return comment.content
                }),
                belongsToUser: req.session.user_id === postData.user_id
            }
        })

        res.render('home', {
            posts,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {

            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        })

        const post = postData.get({ plain: true })
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
})


router.get('/login', (req, res) => {
    try {
        res.render('login')
    }
    catch (error) {
        res.status(500).json(err)
    }

})



module.exports = router