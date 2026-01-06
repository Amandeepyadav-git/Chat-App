//Node server which will handle socket io connections

const io = require('socket.io')(8000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
        // it's just a random comment for my regular post 
    }
})

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        // console.log('New user: ', name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
       })

    socket.on('send', message =>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    })
})