'use strict'

const Schema = use('Schema')

class FamilyTableSchema extends Schema {

  up () {
    this.create('family', (table) => {
      table.increments()
      table.string('name',100).notNullable()
      table.integer('admin_id').unsigned().references('id').inTable('users')
      table.timestamps()

      //table.integer('user_id').unsigned().references('id').inTable('users')
    })
  }

  down () {
    this.drop('family')
  }

}

module.exports = FamilyTableSchema
