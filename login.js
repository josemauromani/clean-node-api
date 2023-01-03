const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')

module.exports = () => {
    router.post('/signup', async (req, res) => {
        const { email, password, repeatPassword } = req.body
        if (password === repeatPassword) {
            const user = await AccountModel.create(email, password)
            return res.json(user)
        }
        res.status(400).json({ error: 'password must be equal to repeat password' })
    })
}
