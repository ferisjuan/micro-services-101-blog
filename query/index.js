import cors from 'cors'
import express from 'express'

const app = express()
app.use(express.json())
app.use(cors())

const posts = {}
// {postId: { postId, title, comments: [{commentId, content}] } }

app.get('/posts', (req, res) => {
	res.send(posts)
})

app.post('/events', (req, res) => {
	const { type, data } = req.body

	if (type === 'PostCreated') {
		const { id, title } = data

		posts[id] = { id, title, comments: [] }
	}

	if (type === 'CommentCreated') {
		const { id, content, postId, status } = data

		const post = posts[postId]
		post.comments.push({ id, content, postId, status })
	}

	res.send({})
})

app.listen(4002, () => {
	console.log('Listening on 4002')
})
