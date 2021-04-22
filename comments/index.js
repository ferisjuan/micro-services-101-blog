import express from 'express'
import { randomBytes } from 'crypto'

const commentsByPostId = {}

const app = express()
app.use(express.json())

app.get('/posts/:id/comments', (req, res) => {
	res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', (req, res) => {
	const commentId = randomBytes(4).toString('hex')
	const { content } = req.body
	const { id: postId } = req.params

	const comments = commentsByPostId[postId] || []

	comments.push({ id: commentId, content })

	commentsByPostId[postId] = comments

	res.status(201).send(comments)
})

app.listen(4001, () => {
	console.log('Listening on 4001')
})