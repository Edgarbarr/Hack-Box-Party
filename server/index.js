const app = require('express')();
const express = require('express');
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3187;
const bodyParser = require('body-parser');
const routes = require('./routes')
const models = require('../database/models')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', routes);



io.on('connection', (socket) => {

    socket.on('join', ({name, room}, callback)=>{
        models.postUser({id: socket.id, name, room},(err, results) => {
            if(err) {
                console.log(err)
            } else {
                var user = results[0];
                socket.emit('message', { user: 'admin', text: `Welcome ${user.username} to ${user.room}`});

                socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.username} has joined ${user.room}`})

                socket.join(user.room)
                callback();
            }
        })
        

        
    })

    socket.on('sendMessage', (message, callback) => {
        models.getUser(socket.id, (err, results) => {
            if(err) {
                console.log(err)
            } else {
                var user = results[0]
                io.to(user.room).emit('message', {user: user.username, text: message})
                callback();
            }
        })
    })

    socket.on('disconnect', (message, callback)=>{
        console.log('User disconnected')
    })
})

server.listen(port, ()=>{console.log(`listening on ${port}`)})

app.use(express.static(path.join(__dirname, '../client/dist')))
