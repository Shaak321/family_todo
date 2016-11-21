'use strict'

const Schema = use('Schema')

class UserFamiliesTableSchema extends Schema {

  up () {
    this.create('user_families', (table) => {
      table.string('username',80).references('username').inTable('users');
      table.integer('family_id').unsigned().references('id').inTable('users');
      table.timestamps()
    })
  }

  down () {
    this.drop('user_families')
  }

}

module.exports = UserFamiliesTableSchema
