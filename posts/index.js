import express from 'express'
import { randomBytes } from 'crypto'

const posts = {}
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send(posts)
})

app.post('/', (req, res) => {
	const id = randomBytes(4).toString('hex')
	const { title } = req.body

	posts[id] = { id, title }

	res.status(201).send(posts[id])
})

app.listen(4000, () => {
	console.log('Listening on 4000')
})
