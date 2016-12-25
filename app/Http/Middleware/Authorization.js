'use strict'

class Authorization {

  * handle (req, res, next) {
    if(req.currentUser != null){
      yield next
    }else{
        yield req
                .withAll()
                .andWith({ errors: [{message: 'Hoooops... No rights to see this page :( Please log in'}] })
                .flash()

            res.redirect('/error')
    }
  }

}

module.exports = Authorization
