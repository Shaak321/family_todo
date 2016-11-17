'use strict'

const Lucid = use('Lucid')

class Family extends Lucid {

  user () {
      var membersOfSpecifiedFamily = "pistus";
     
    return this.belongsTo('App/Model/Family')
  }

}

module.exports = Family