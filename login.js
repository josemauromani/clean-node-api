
module.exports = () => {
    router.post('/signup', new SignUpRouter().route)
}

// signup-router.js
const express = require('express')
const router = express.Router()
class SignUpRouter {
    async route(req, res) {
        const { email, password, repeatPassword } = req.body
        SignUpUseCase.signup(email, password, repeatPassword)
        res.status(400).json({ error: 'password must be equal to repeat password' })
    }
}

// signup-case.js
class SignUpUseCase {
    async signup(email, password, repeatPassword) {
        if (password === repeatPassword) {
            AddAccountRepository.add(email, password)
        }
    }
}

// add-account-repository.js
const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')
class AddAccountRepository {
    async add(email, password) {
        const user = await AccountModel.create(email, password)
        return user
    }
}
