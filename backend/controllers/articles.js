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
    res.json(place)
})

router.get('/', async (req, res) => {
    const articles = await Article.findAll()
    res.json(articles)   
})


router.get('/:articleId', async (req, res) => {
    let articleId = Number(req.params.articleId)
    if (isNaN(articleId)) {
        res.status(404).json({ message: `Invalid id "${articleId}"` })
    } else {
        const article = await Article.findOne({
            where: { articleId: articleId },
            include: {
                association: 'comments',
                include: 'author'
            }
        })
        if (!article) {
            res.status(404).json({ message: `Could not find place with id "${articleId}"` })
        } else {
            res.json(article)
        }
    }
})

router.put('/:articleId', async (req, res) => {
    if(req.currentUser?.canEditarticle()){
        return res.status(403).json({message:'You are not allowed to edit articles'})
    }
    let articleId = Number(req.params.articleId)
    if (isNaN(articleId)) {
        res.status(404).json({ message: `Invalid id "${articleId}"` })
    } else {
        const article = await Article.findOne({
            where: { articleId: articleId },
        })
        if (!article) {
            res.status(404).json({ message: `Could not find place with id "${articleId}"` })
        } else {
            Object.assign(article, req.body)
            await article.save()
            res.json(article)
        }
    }
})

router.delete('/:articleId', async (req, res) => {
    if(req.currentUser?.canDeletearticle()){
        return res.status(403).json({message:'You are not allowed to delete articles'})
    }
    let articleId = Number(req.params.placeId)
    if (isNaN(articleId)) {
        res.status(404).json({ message: `Invalid id "${articleId}"` })
    } else {
        const article = await Article.findOne({
            where: {
                articleId: articleId
            }
        })
        if (!article) {
            res.status(404).json({ message: `Could not find place with id "${articleId}"` })
        } else {
            await article.destroy()
            res.json(article)
        }
    }
})

router.post('/:articleId/comments', async (req, res) => {
    const articleId = Number(req.params.articleId)

    req.body.rant = req.body.rant ? true : false

    const place = await Article.findOne({
        where: { articleId: articleId }
    })

    if (!place) {
        res.status(404).json({ message: `Could not find place with id "${articleId}"` })
    }
    let currentUser;
    try 
    {
        currentUser = await User.findOne({
            where: {
                userId: req.session.userId
            }
        })
    }
    catch 
    {
        currentUser = null
    }
    const author = await User.findOne({
        where: { userId: req.body.authorId }
    })

    if (!author) {
        res.status(404).json({ message: `Could not find author with id "${req.body.authorId}"` })
    }
    if(!req.currentUser) {
        return res.status(404).json({
            message:`You must be logged in to leave a comment.`
        })
    }
    const comment = await Comment.create({
        ...req.body,
        authorId: req.currentUser.userId,
        articleId: articleId
    })

    res.send({
        ...comment.toJSON(),
        author:req.currentUser
    })
})

router.delete('/:articleId/comments/:commentId', async (req, res) => {
    let articleId = Number(req.params.articleId)
    let commentId = Number(req.params.commentId)

    if (isNaN(placeId)) {
        res.status(404).json({ message: `Invalid id "${articleId}"` })
    } else if (isNaN(commentId)) {
        res.status(404).json({ message: `Invalid id "${commentId}"` })
    } else {
        const comment = await Comment.findOne({
            where: { commentId: commentId, articleId: articleId }
        })
        if (!comment) {
            res.status(404).json({ message: `Could not find comment with id "${commentId}" for article with id "${articleId}"` })
        } else if (comment.authorId !== req.currentUser?.userId){
            res.status(403).json({
                message: `You do not have permission to delete comment "${comment.commentId}"`
            })
        }
        
         else {
            await comment.destroy()
            res.json(comment)
        }
    }
})
module.exports = router