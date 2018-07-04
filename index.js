const express = require('express')
const morgan = require('morgan')
const path = require('path')
const socketIO = require('socket.io')

const app = express()

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(morgan('dev'))

app.get('/', (request, response) => {
  response.render('index')
})

let server = app.listen(4001, () => {
  console.log('listen port: 4001')
})

let io = socketIO(server)

io.on('connection', (socket) => {
  console.log('user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on('message', (message) => {
    console.log(message)
    io.emit('message', message)
  })
})
