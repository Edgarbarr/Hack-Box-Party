const db = require('./index');
const models = {
    postUser: (user, callback) => {
        db.query(`INSERT INTO Users(id, username, room, score) values($1, $2, $3, $4) RETURNING *`,[user.id, user.name, user.room, user.score], (err, result)=>{
            if(err) {
                callback(err)
            } else {
                callback(null, result.rows)
            }
        })
    },
    getUser: (id, callback) => {
        db.query(`SELECT * from Users where id = $1`,[id], (err, result)=>{
            if(err) {
                callback(err)
            } else {
                callback(null, result.rows)
            }
        })
    },
    getUsersInRoom: ({room}, callback) => {
    
        db.query(`SELECT * from Users where room = $1`, [`${room}`], (err, result) => {
            if(err) {
                callback(err)
            } else {
                callback(null, result.rows)
            }
        })
    },
    removeUser: (id, callback) => {
        db.query(`Delete from Users where id = $1 returning *`, [`${id}`], (err, result) => {
            if(err) {
                callback(err)
            } else {
                callback(null, result.rows)
            }
        })
    }
}
module.exports = models;