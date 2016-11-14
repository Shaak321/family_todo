'use strict'

const Schema = use('Schema')

class UserFamilyTableSchema extends Schema {

  up () {
    this.create('user_family', (table) => {
      table.string('username',80).references('username').inTable('users');
      table.integer('family_id').unsigned().references('id').inTable('users');
    })
  }

  down () {
    this.drop('user_family')
  }

}

module.exports = UserFamilyTableSchema
