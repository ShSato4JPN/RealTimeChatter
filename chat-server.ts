const express = require('express')
const app = express()
const server = require('http').createServer(app)
const portNo = 3001
server.listen(portNo, () => {
  console.log(`server start "http://localhost:${portNo}"`)
})
// public ディレクトリのファイルを自動で返す
app.use('/public', express.static('./public'))
app.get('/', (req: any, res: any) => {
  res.redirect(302, '/public')
})

// WebSocket　サーバ起動
const socketio = require('socket.io')
const io = socketio.listen(server)
// クライアントが接続した時のイベントを設定
io.on('connection', (socket: any) => {
  console.log(`user is connected  id : ${socket.client.id}`)
  //　メッセージ受信時の処理
  socket.on('chat-msg', (msg: any) => {
    console.log(`msg : ${msg}`)
    io.emit('chat-msg', msg)
  })
})