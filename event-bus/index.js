import axios from 'axios'
import express from 'express'

const app = express()
app.use(express.json())

const events = []

app.post('/events', (req, res) => {
	const event = req.body

	try {
		events.push(event)

		axios.post('http://localhost:4000/events', event)
		axios.post('http://localhost:4001/events', event)
		axios.post('http://localhost:4002/events', event)
		axios.post('http://localhost:4003/events', event)

		res.send({ status: 'OK' })
	} catch (error) {
		console.log(error.message)
	}
})

app.get('/events', (req, res) => {
	res.send(events)
})

app.listen(4005, () => {
	console.log('Listening on 4005')
})
