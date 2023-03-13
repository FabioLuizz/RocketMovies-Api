const { Router } = require('express')

const UsersRoutes = require('./users.routes')
const NotesRoutes = require('./notes.routes')
const TagsRoutes = require('./tags.routes')
const SessiosRoutes = require('./session.routes')

const routes = new Router()

routes.use('/users', UsersRoutes)
routes.use('/notes', NotesRoutes)
routes.use('/tags', TagsRoutes)
routes.use('/sessions', SessiosRoutes)

module.exports = routes