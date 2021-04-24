import axios from 'axios'
import express from 'express'

const app = express()
app.use(express.json())

app.post('/events', (req, res) => {})

app.listen(4003, () => {
	console.log('Listening on 4003')
})
