const db = require('./index');
const models = {
    postUser: (user, callback) => {
        db.query(`INSERT INTO Users(id, username, room) values($1, $2, $3) RETURNING *`,[user.id, user.name, user.room], (err, result)=>{
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
    getUsersInRoom: (room) => {
        db.query(`SELECT * from Users where room = $1`, [room], (err, result) => {
            if(err) {
                callback(err)
            } else {
                callback(null, result.rows)
            }
        })
    },
    removeUser: (id) => {
        db.query(`Delete * from Users where id = $1`, [id], (err, result) => {
            if(err) {
                callback(err)
            } else {
                callback(null, result.rows)
            }
        })
    }
}
module.exports = models;