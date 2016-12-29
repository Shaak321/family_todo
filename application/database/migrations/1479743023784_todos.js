'use strict'

const Schema = use('Schema')

class TodosTableSchema extends Schema {

  up () {
    this.create('todos', (table) => {
      table.increments()
      table.date('start').notNullable()
      table.date('end').notNullable()
      table.string('name',300).notNullable()
      table.string('description',2000).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.boolean('iscompleted').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('todos')
  }

}

module.exports = TodosTableSchema
