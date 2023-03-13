const knex = require('../database/knex')
const AppError = require('../utils/apperror')
const { compare } = require('bcryptjs')
const Auth = require('../config/auth')
const { sign } = require('jsonwebtoken')

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    const user = await knex('users').where("email", email).first()

    if (!user) {
      throw new AppError('Email ou/a senha incorreta!', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Email ou/a senha incorreta!', 401)
    }

    const { secret, expiresIn } = Auth.jwt
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return response.json({ user, token })
  }
}

module.exports = SessionsController
