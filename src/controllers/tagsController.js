const knex = require('../database/knex')
const AppError = require('../utils/apperror')

class TagsController {
  async index(request, response) {
    const user_id = request.user.id

    const tags = await knex('tags').where(user_id)

    if (!tags) {
      throw new AppError('A tag não foi encontrada!', 400)
    }

    response.json(tags)
  }
}

module.exports = TagsController
