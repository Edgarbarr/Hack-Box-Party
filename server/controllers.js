const models = require('../database/models');

const controllers = {
    postUser:(req, res) =>{
        models.postUser(req.body, (err, result)=>{
            if(err) {
                res.status(404).send(err)
            } else {
                res.status(200).send(result)
            }
        })
    },
    getUser: (req, res) => {
        models.getUser(req.params.id, (err, result)=>{
            if(err){
                res.status(404).send(err)
            } else {
                res.status(200).send(result)
            }
        })
    },
    deleteUser: (req, res) => {
        models.removeUser(req.params.id, (err, result) => {
            if(err) {
                res.status(404).send(err)
            } else {
                res.status(200).send(result);
            }
        })
    },
    getAllUsersInRoom: (req, res) => {
        models.getUsersInRoom(req.body, (err, result)=>{
            if(err) {
                res.status(404).send(err)
            } else {
                res.status(200).send(result)
            }
        })
    }
}
module.exports = controllers;