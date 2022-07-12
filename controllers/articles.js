const router = require('express').Router()
const db = require("../models")
const { Article, Comment, User } = db

router.post('/', async (req, res) => {
    if(!req.currentUser){
        return res.status(403).json({message:'You must be logged in to create an article.'})
    }

    if (!req.body.title || !req.body.content) {
        return res.status(400).json({message: "Article title and content must not be empty."})
    }
    
    const article = await Article.create({
        ...req.body,
        user_id: req.currentUser.user_id
    })
    return res.json(article)
})

router.get('/', async (req, res) => {
    const articles = await Article.findAll({
        order: [["article_id", "DESC"]],
        limit: 10
    })
    return res.json(articles)   
})


router.get('/:article_id', async (req, res) => {
    let article_id = Number(req.params.article_id)
    if (isNaN(article_id)) {
        return res.status(404).json({ message: `Invalid id "${article_id}"` })
    } else {
        const article = await Article.findOne({
            where: { article_id: article_id },
            include: [{
                association: "artComments",
                include: {
                    association: "comAuthor",
                    attributes: ["first_name", "last_name"]
                }
            },{
                association: 'artAuthor',
                attributes: ["first_name", "last_name"]
            }]

        })
        if (!article) {
            return res.status(404).json({ message: `Could not find article with id "${article_id}"` })
        } else {
            return res.json(article)
        }
    }
})

router.put('/:article_id', async (req, res) => {
    let article_id = Number(req.params.article_id)
    if (isNaN(article_id)) {
        return res.status(404).json({ message: `Invalid id "${article_id}"` })
    } else {
        const article = await Article.findOne({
            where: { article_id: article_id },
        })
        if (!article) {
            return res.status(404).json({ message: `Could not find article with id "${article_id}"` })
        } else if(article.user_id !== req.currentUser?.user_id && req.currentUser?.role !== "admin") {
            return res.status(403).json({message:'You are not allowed to edit this article.'})
        } else {
            Object.assign(article, req.body)
            await article.save()
            return res.json(article)
        }
    }
})

router.delete('/:article_id', async (req, res) => {
    
    let article_id = Number(req.params.article_id)
    if (isNaN(article_id)) {
        return res.status(404).json({ message: `Invalid id "${article_id}"` })
    } else {
        const article = await Article.findOne({
            where: {
                article_id: article_id
            }
        })
        if (!article) {
            return res.status(404).json({ message: `Could not find article with id "${article_id}"` })
        } else if(article.user_id !== req.currentUser?.user_id && req.currentUser?.role !== "admin") {
            return res.status(403).json({message:'You are not allowed to delete this article.'})
        } else {
            await article.destroy()
            return res.json(article)
        }
    }
})

router.post('/:article_id/comments', async (req, res) => {
    const article_id = Number(req.params.article_id)

    const article = await Article.findOne({
        where: { article_id: article_id }
    })

    if (!article) {
        return res.status(404).json({ message: `Could not find article with id "${article_id}"` })
    }

    if(!req.currentUser) {
        return res.status(404).json({ message: "You must be logged in to leave a comment."})
    }

    const comment = await Comment.create({
        comment: req.body.comment,
        user_id: req.currentUser.user_id,
        article_id: article_id
    })

    return res.send({
        ...comment.toJSON(),
        comAuthor: {
            first_name: req.currentUser.first_name,
            last_name: req.currentUser.last_name
        }
    })
})

router.delete('/:article_id/comments/:comment_id', async (req, res) => {
    let article_id = Number(req.params.article_id)
    let comment_id = Number(req.params.comment_id)

    if (isNaN(article_id)) {
        return res.status(404).json({ message: `Invalid id "${article_id}"` })
    } else if (isNaN(comment_id)) {
        return res.status(404).json({ message: `Invalid id "${comment_id}"` })
    } else {
        const comment = await Comment.findOne({
            where: { comment_id: comment_id, article_id: article_id }
        })
        if (!comment) {
            return res.status(404).json({ message: `Could not find comment with id "${comment_id}" for article with id "${article_id}"` })
        } else if (comment.user_id !== req.currentUser?.user_id && req.currentUser?.role !== "admin"){
            return res.status(403).json({ message: `You do not have permission to delete comment "${comment.comment_id}"`})
        }
         else {
            await comment.destroy()
            return res.json(comment)
        }
    }
})

module.exports = router