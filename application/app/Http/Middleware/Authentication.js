'use strict'
const User = use('App/Model/User')
const Hash = use('Hash')
class Authentication {

  * handle (req, res, next) {
    const username = req.input('username')
    const pass = req.input('password')
    if(username && pass){
      const credentials = yield User.findBy('username',username)
      if(credentials){
        const isPasswordValid = yield Hash.verify(pass,credentials.password)
        if(isPasswordValid){
          yield next
        }else{
          yield req
                .withAll()
                .andWith({ errors: [{message: 'Incorrect credentials'}] })
                .flash()

            res.redirect('/login')
            return
        }
      }else{
          yield req
                .withAll()
                .andWith({ errors: [{message: 'No such user'}] })
                .flash()

            res.redirect('/login')
            return
      }
    }else{
        yield req
                .withAll()
                .andWith({ errors: [{message: 'No username or password is provided'}] })
                .flash()

            res.redirect('/login')
            return
    }
  }
}

module.exports = Authentication
