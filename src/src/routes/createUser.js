const { Router } = require('express')

const router = Router();

router.post('/', (req, res) => {
    return res.send({
        body: 'Message Received!!'
    });
})

router.post('/createUser', (req, res) => {
    return res.send({
        body: 'User creation successful!!'
    });
})

module.exports = router