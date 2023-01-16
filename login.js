const express = require('express')
const router = express.Router()

/**
 * Codigo Original
 */

// module.exports = () => {
//     router.post('signup', async (req, res) => {
//         const { email, password, repeatPassword } = req.body
//         if (password === repeatPassword) {
//             const user = await AccountModel.create({ email, password })
//             return res.json(user)
//         }
//         res.status(400).json({ error: 'password must be equal to repeatPassword' })
//     })
// }

module.exports = () => {
    const signUpRouter = new SignUpRouter()
    router.post('/signup', ExpressRouterAdapter.adapt(signUpRouter))
}

// Adapter
// express-router-adapter.js
class ExpressRouterAdapter {
    static adapt(router) {
        let httpRequest
        return async (req, res) => {
            httpRequest = {
                body: req.body
            }
            const httpResponse = await router.route(httpRequest)
            res.status(httpResponse.statusCode).json(httpResponse.body)
        }
    }
}

// Presentation Layer
// signup-router.js
class SignUpRouter {
    async route(httpRequest) {
        const { email, password, repeatPassword } = httpRequest.body
        const user = await SignUpUseCase.signup(email, password, repeatPassword)
        return {
            statusCode: 200,
            body: user
        }
    }
}

// Domain Layer
// signup-case.js
class SignUpUseCase {
    async signup(email, password, repeatPassword) {
        if (password === repeatPassword) {
            AddAccountRepository.add(email, password)
        }
    }
}

// Infra Layer
// add-account-repository.js
const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')
class AddAccountRepository {
    async add(email, password) {
        const user = await AccountModel.create(email, password)
        return user
    }
}
