const http = require('http')
const { WebSocket } = require('ws')
const app = require('express')()
const wss = new WebSocket.Server({ noServer: true, path: '/ws/feed' })

wss.on('connection', (socket) => {
  socket.on('message', (data) => {
    console.log(data)
  })
  socket.on('error', (e) => {
    console.log(e.message)
  })
  socket.on('close', (code) => {
    console.log(code + ' Connection closed')
  })
})

wss.on('error', (e) => {
  console.log(e.message)
})

const server = http.createServer(app)

server.listen(8000, () => {
  console.log('Listenting')
})

server.on('upgrade', (req, socket, head) => {
  socket.on('error', (e) => {
    console.log(e.message)
  })
  wss.handleUpgrade(req, socket, head, (socket, req) => {
    wss.emit('connection', socket, req)
  })
})
