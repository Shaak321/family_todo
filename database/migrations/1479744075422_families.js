'use strict'

const Schema = use('Schema')

class FamiliesTableSchema extends Schema {

  up () {
    this.create('families', (table) => {
      table.increments()
      table.string('name',100).notNullable()
      table.integer('admin_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('families')
  }

}

module.exports = FamiliesTableSchema
