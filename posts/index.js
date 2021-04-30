import axios from 'axios'
import express from 'express'

import cors from 'cors'
import { randomBytes } from 'crypto'

const posts = {}

const app = express()
app.use(express.json())
app.use(cors())

app.get('/posts', (req, res) => {
	res.send(posts)
})

app.post('/posts', async (req, res) => {
	const id = randomBytes(4).toString('hex')
	const { title } = req.body

	const post = { id, title }
	posts[id] = post

	try {
		await axios.post('http://event-bus-srv:4005/events', {
			type: 'PostCreated',
			data: {
				...post,
			},
		})
	} catch (error) {
		console.log(error.message)
	}

	res.status(201).send(posts[id])
})

app.post('/events', (req, res) => {
	console.log('Received event', req.body.type)

	res.send({})
})

app.listen(4000, () => {
	console.log('Running latest version')
	console.log('Posts is listening on 4000')
})
