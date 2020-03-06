const router = require('express').Router();
const controllers = require('./controllers')

router
.route('/users')
.post(controllers.postUser)

router
.route('/users/:id')
.get(controllers.getUser)
.delete(controllers.deleteUser)

router
.route('/room')
.post(controllers.getAllUsersInRoom)


module.exports = router;