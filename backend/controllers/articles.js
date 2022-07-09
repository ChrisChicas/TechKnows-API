const router = require('express').Router()
const db = require("../models")
const { Article, Comment, User } = db

router.post('/', async (req, res) => {
    if(req.currentUser?.canAddarticle()){
        return res.status(403).json({message:'You are not allowed to add an article'})
    }
    if (!req.body.title) {
        req.body.title = 'You are Good'
    }
    if (!req.body.content) {
        req.body.content = 'AnyContent'
    }
    
    const article = await Article.create(req.body)
    res.json(article)
})

router.get('/', async (req, res) => {
    const articles = await Article.findAll()
    res.json(articles)   
})


router.get('/:article_id', async (req, res) => {
    let article_id = Number(req.params.article_id)
    if (isNaN(article_id)) {
        res.status(404).json({ message: `Invalid id "${article_id}"` })
    } else {
        const article = await Article.findOne({
            where: { article_id: article_id },
            include: {
                association: 'comments',
                include: 'author'
            }
        })
        if (!article) {
            res.status(404).json({ message: `Could not find article with id "${article_id}"` })
        } else {
            res.json(article)
        }
    }
})

router.put('/:article_id', async (req, res) => {
    if(req.currentUser?.canEditarticle()){
        return res.status(403).json({message:'You are not allowed to edit articles'})
    }
    let article_id = Number(req.params.article_id)
    if (isNaN(article_id)) {
        res.status(404).json({ message: `Invalid id "${article_id}"` })
    } else {
        const article = await Article.findOne({
            where: { article_id: article_id },
        })
        if (!article) {
            res.status(404).json({ message: `Could not find place with id "${article_id}"` })
        } else {
            Object.assign(article, req.body)
            await article.save()
            res.json(article)
        }
    }
})

router.delete('/:article_id', async (req, res) => {
    if(req.currentUser?.canDeletearticle()){
        return res.status(403).json({message:'You are not allowed to delete articles'})
    }
    let article_id = Number(req.params.article_id)
    if (isNaN(article_id)) {
        res.status(404).json({ message: `Invalid id "${article_id}"` })
    } else {
        const article = await Article.findOne({
            where: {
                article_id: article_id
            }
        })
        if (!article) {
            res.status(404).json({ message: `Could not find article with id "${article_id}"` })
        } else {
            await article.destroy()
            res.json(article)
        }
    }
})

router.post('/:article_id/comments', async (req, res) => {
    const article_id = Number(req.params.article_id)

    req.body.comment = req.body.comment ? true : false

    const place = await Article.findOne({
        where: { article_id: article_id }
    })

    if (!place) {
        res.status(404).json({ message: `Could not find article with id "${article_id}"` })
    }
    let currentUser;
    try 
    {
        currentUser = await User.findOne({
            where: {
                user_id: req.session.user_id
            }
        })
    }
    catch 
    {
        currentUser = null
    }
    const user = await User.findOne({
        where: { user_id: req.body.user_id }
    })

    if (!user) {
        res.status(404).json({ message: `Could not find author with id "${req.body.user_id}"` })
    }
    if(!req.currentUser) {
        return res.status(404).json({
            message:`You must be logged in to leave a comment.`
        })
    }
    const comment = await Comment.create({
        ...req.body,
        user_id: req.currentUser.user_id,
        article_id: article_id
    })

    res.send({
        ...comment.toJSON(),
        user:req.currentUser
    })
})

router.delete('/:article_id/comments/:comment_id', async (req, res) => {
    let article_id = Number(req.params.article_id)
    let comment_id = Number(req.params.comment_id)

    if (isNaN(placeId)) {
        res.status(404).json({ message: `Invalid id "${article_id}"` })
    } else if (isNaN(comment_id)) {
        res.status(404).json({ message: `Invalid id "${comment_id}"` })
    } else {
        const comment = await Comment.findOne({
            where: { comment_id: comment_id, article_id: article_id }
        })
        if (!comment) {
            res.status(404).json({ message: `Could not find comment with id "${comment_id}" for article with id "${article_id}"` })
        } else if (comment.user_id !== req.currentUser?.user_id){
            res.status(403).json({
                message: `You do not have permission to delete comment "${comment.comment_id}"`
            })
        }
        
         else {
            await comment.destroy()
            res.json(comment)
        }
    }
})
module.exports = router