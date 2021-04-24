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
	const comment = { id: commentId, content, status: 'pending' }
	comments.push(comment)

	commentsByPostId[postId] = comments

	try {
		await axios.post('http://localhost:4005/events', {
			type: 'CommentCreated',
			data: {
				...comment,
				postId,
			},
		})

		res.status(201).send(comments)
	} catch (error) {
		console.log(error.message)
	}
})

app.post('/events', async (req, res) => {
	console.log('Received event', req.body.type)

	if (req.body.type === 'CommentModerated') {
		const { id, postId, status, content } = req.body.data
		const comments = commentsByPostId[postId]
		const comment = comments.find(comment => comment.id === id)

		comment.status = status

		try {
			await axios.post('http://localhost:4005/events', {
				type: 'CommentUpdated',
				data: {
					postId,
					id,
					status,
					content,
				},
			})
		} catch (error) {
			console.error(error.message)
		}
	}

	res.send({})
})

app.listen(4001, () => {
	console.log('Comments is listening on 4001')
})
