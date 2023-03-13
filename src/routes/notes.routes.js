const { Router } = require('express')

const NotesController = require('../controllers/notesController')
const notesController = new NotesController()

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const NotesRoutes = new Router()

NotesRoutes.post('/', ensureAuthenticated, notesController.create)
NotesRoutes.delete('/:id', notesController.delete)
NotesRoutes.get('/:id', notesController.show)
NotesRoutes.get('/', notesController.index)
NotesRoutes.put('/:id', notesController.update)

module.exports = NotesRoutes
