const knex = require('../database/knex')
const AppError = require('../utils/apperror')

class NotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body
    const user_id = request.user.id

    const note_id = await knex('notes').insert({
      title,
      description,
      rating,
      user_id
    })

    const tagsInsert = await tags.map(tag => {
      return {
        note_id,
        user_id,
        name: tag
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
      }
    })

    await knex('tags').insert(tagsInsert)

    response.json('Nota cadastrada com sucesso!')
  }

  async delete(request, response) {
    const { id } = request.params

    await knex('notes').where({ id }).delete()

    response.json('Nota deletada com sucesso!')
  }

  async show(request, response) {
    const { id } = request.params

    const notes = await knex('notes').where({ id })

    const userTags = await knex('tags').where('note_id', id)

    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)

      return {
        ...note,
        tags: noteTags
      }
    })

    response.json(notesWithTags)
  }

  async index(request, response) {
    const { user_id, title, tags } = request.query

    let notes

    if (tags) {
      const filterTags = tags.split('.').map(tag =>
        tag
          .trim()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
      )

      notes = await knex('tags')
        .select(['notes.id', 'notes.title', 'notes.user_id'])
        .where('notes.user_id', user_id)
        .whereLike('notes.title', `%${title}%`)
        .whereIn('name', filterTags)
        .innerJoin('notes', 'notes.id', 'tags.note_id')
    } else {
      notes = await knex('notes')
        .where({ user_id })
        .whereLike('title', `%${title}%`)
        .orderBy('title')
    }

    const userTags = await knex('tags').where({ user_id })

    const notesWithTags = notes.map(note => {
      const tagsFilter = userTags.filter(tag => tag.note_id === note.id)

      return {
        ...note,
        tags: tagsFilter
      }
    })

    return response.json(notesWithTags)
  }

  async update(request, response) {
    const { title, description, rating, tags } = request.body
    const { id } = request.params

    await knex('notes').where({ id }).update({
      title,
      description,
      rating
    })

    response.json('Nota atualizada com sucesso!')
  }
}

module.exports = NotesController
