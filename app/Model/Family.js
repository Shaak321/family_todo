'use strict'

const Lucid = use('Lucid')

class Family extends Lucid {

  user () {
    return this.belongsTo('App/Model/Family')
  }

}

module.exports = Family