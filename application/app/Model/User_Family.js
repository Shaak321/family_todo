'use strict'

const Lucid = use('Lucid')

class User_Family extends Lucid {

  user () {
    return this.belongsTo('App/Model/User_Family')
  }

}

module.exports = User_Family