import axios from 'axios'
import express from 'express'

const app = express()
app.use(express.json())

const wordToModerate = 'red'

app.post('/events', async (req, res) => {
	const { type, data } = req.body

	if (type === 'CommentCreated') {
		const status = data.content.includes(wordToModerate)
			? 'rejected'
			: 'approved'

		console.log(status)

		await axios.post('http://localhost:4005/events', {
			type: 'CommentModerated',
			data: {
				id: data.id,
				postId: data.postId,
				status,
				content: data.content,
			},
		})
	}

	res.send({})
})

app.listen(4003, () => {
	console.log('Listening on 4003')
})
