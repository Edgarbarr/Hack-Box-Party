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
        
        const clientCount = socket.client.conn.server.clientsCount;
        if(clientCount > 4) {
            callback("This room is full")
            return;
        }
        
        models.postUser({id: socket.id, name, room, score: 0},(err, results) => {
            if(err) {
                console.log(err)
                callback("Username already exists")
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
    
    socket.on('questions', (questions, callback) => {

        models.getUser(socket.id, (err, results) => {
            if(err) {
                console.log(err)
            } else {
                var user = results[0];
                socket.broadcast.to(user.room).emit('GameReady', questions)
            }
        })
        // socket.broadcast.to(user.room).emit('answer', {user: questions})
    })

    socket.on('nextQuestion', (updates, callback)=>{
 
        models.getUser(socket.id, (err, results) => {

            if(err) {
                console.log(err)
            } else {
                var user = results[0];

                // io.to(user.room).emit('updateQuestion', updates)
                updates.username = user.username;
    
                io.to(user.room).emit('update', updates)
                
            }
        })
    })

    socket.on('totalClients', ()=>{
        models.getUser(socket.id, (err, results) => {
            if(err) {
                console.log(err)
            } else {
                var user = results[0];
                var clients = io.sockets.adapter.rooms[user.room]
                socket.emit('returnClients', clients.sockets);
            }
        })
    })
    socket.on('winner', ()=>{
        models.getUser(socket.id, (err, results) => {
            if(err){
                console.log(err)
            } else {
                var user = results[0];
                var username = user.username
                io.to(user.room).emit('gameover', {username})
                console.log('hello from winner server')
            }
        })
    } )

    socket.on('disconnect', (message, callback)=>{
        models.removeUser(socket.id, (err, results) => {
            if(err) {
                console.log(err)
            }
            var user = results[0];
            if(user){
                io.to(user.room).emit('message', {user: 'admin', text: `${user.username} left ${user.room}`})
            }
        });

    })
    
})

server.listen(port, ()=>{console.log(`listening on ${port}`)})

app.use(express.static(path.join(__dirname, '../client/dist')))
