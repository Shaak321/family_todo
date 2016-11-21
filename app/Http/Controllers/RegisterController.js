'use strict'

const User = use('App/Model/User')
const Hash = use('Hash')
const Validator = use('Validator')


class RegisterController {
  * register(req,res){
      yield res.sendView('register');
    }

    * doRegister(req, res) {

        var registerMessage = {
            success: 'Whoooooo! You just registered!',
            password_mismatch: 'Password doesn\'t match'
        }

        const data = {
          name: req.input('name'),
          username:  req.input('username'),
          email: req.input('email'),
          home: req.input('home'),
          workplace: req.input('workplace'),
          birth: req.input('birth'),
          pass1: req.input('password1'),
          pass2: req.input('password2')
        }

       

        const rules = {
          name: 'required|min:12',
          username:  'required|min:3',
          email: 'required|email',
          pass1: 'required|same:pass2',
          workplace: 'required|min:10',
          birth: 'required|date',
          home: 'required|min:10',

        }

        const validation = yield Validator.validateAll(data, rules)
        if(validation.fails()){
            
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('/register')
            return
        }

        const user = new User()
        user.name = data.name
        user.username = data.username
        user.email = data.email
        user.password = yield Hash.make(data.pass1)
        user.home = data.home
        user.workplace = data.workplace
        user.birth = data.birth
        yield user.save()

        yield res.sendView('register', { registerMessage : registerMessage.success })
    }
}

module.exports = RegisterController
