'use strict'

const Lucid = use('Lucid')

class Todos extends Lucid {

  user () {
    return this.belongsTo('App/Model/Todos')
  }

}

module.exports = Todos