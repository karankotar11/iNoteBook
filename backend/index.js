// const connectToMongo=require('./db');
import connectToMongo from './db';
connectToMongo();

const express = require('express')
const cors=require("cors");
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

//available routes
app.post('/api/v1/login', (req, res) => {
  res.send('Hello login!')
})
app.post('/api/v1/signup', (req, res) => {
  res.send('Hello signup!')
})
app.post('', (req, res) => {
  res.send('Hello world!')
})

app.listen(port, () => {
  console.log(`iNoteBook listening on port localhost:${port}`)
})

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes')) 