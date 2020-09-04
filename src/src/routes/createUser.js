const AsyncRouter = require('express-async-router').AsyncRouter
const mockDB = require('../mock-db/users')

const router = AsyncRouter()

router.post('/', (req, res) => {
    return res.send({
        body: 'Message Received!!'
    })
})

router.post('/createuser', (req, res) => {
    return mockDB.createUser(req.body).then(function(result) {
        res.status(result.statusCode)
        return res.send(result.body)
    })
})

router.post('/login', (req, res) => {
    return mockDB.login(req.body).then(function (result) {
        res.status(result.statusCode)
        return res.send(result.body)
    })
})

module.exports = router