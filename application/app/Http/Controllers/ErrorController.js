'use strict'

class ErrorController {
    *show(req,res){
        yield res.sendView('error')
    }
}

module.exports = ErrorController
