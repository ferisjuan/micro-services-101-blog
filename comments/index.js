import axios from 'axios'
import express from 'express'

import cors from 'cors'
import { randomBytes } from 'crypto'

const commentsByPostId = {}

const app = express()
app.use(express.json())
app.use(cors())

app.get('/posts/:id/comments', (req, res) => {
	res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
	const commentId = randomBytes(4).toString('hex')
	const { content } = req.body
	const { id: postId } = req.params

	const comments = commentsByPostId[postId] || []
	const comment = { id: commentId, content }
	comments.push(comment)

	commentsByPostId[postId] = comments

	await axios.post('http://localhost:4005/events', {
		type: 'CommentCreated',
		data: {
			...comment,
			postId,
		},
	})

	res.status(201).send(comments)
})

app.post('/events', (req, res) => {
	console.log('Received event', req.body.type)

	res.send({})
})

app.listen(4001, () => {
	console.log('Comments is listening on 4001')
})
