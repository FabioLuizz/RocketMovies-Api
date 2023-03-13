const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../config/upload')

const UsersController = require('../controllers/usersController')
const usersController = new UsersController()

const UserAvatarController = require('../controllers/userAvatarController')
const userAvatarController = new UserAvatarController()

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const UsersRoutes = new Router()
const upload = multer(uploadConfig.MULTER)

UsersRoutes.post('/', usersController.create)
UsersRoutes.get('/:id', usersController.show)
UsersRoutes.put('/', ensureAuthenticated, usersController.update)
UsersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
)

module.exports = UsersRoutes
