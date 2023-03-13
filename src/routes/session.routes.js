const { Router } = require('express')

const SessionsController = require('../controllers/sessionsController')
const sessionsController = new SessionsController()

const SessionsRouter = Router()

SessionsRouter.post('/', sessionsController.create)

module.exports = SessionsRouter
