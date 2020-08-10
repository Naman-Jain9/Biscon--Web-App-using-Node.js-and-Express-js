const express = require('express')
const app = express()
const http = require('http').createServer(app)

//const PORT = process.env.PORT || 3000

http.listen(4000, () => {
    console.log(`Listening on port `)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
//importing socket and passsing http as parameter so that socket will know 
                                    //on which server iit has to work
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})