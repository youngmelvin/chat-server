const express = require('express')
const app = express()
const server = app.listen(3001)
const io = require('socket.io')(server)

app.use(express.static('dist'))

io.on('connection', (socket) => {
    socket.emit('motd', 'Hello ' + socket.id + '! Welcome to the chat!')
    socket.broadcast.emit('user connected', socket.id + ' has connected.')

    socket.on('new message', (data) => {
        io.emit('new message', {sender: socket.id, message: data})
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('user disconnected', socket.id + ' has disconnected.') 
    })
})