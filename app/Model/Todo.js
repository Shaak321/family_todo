'use strict'

const Lucid = use('Lucid')

class Todo extends Lucid {

  user () {
    return this.belongsTo('App/Model/Todo')
  }

}

module.exports = Todo