const express = require('express')
const router = express.Router()
const User = require('../../bot/models/User')

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

module.exports = router