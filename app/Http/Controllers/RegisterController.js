'use strict'

class RegisterController {
  *index(request,response){
      response.sendView('register');
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
          phonenumber: req.input('phonenumber'),
          pass1: req.input('password1'),
          pass2: req.input('password2')
        }

        console.log(data);

        const rules = {
          name: 'required|alpha|min:12',
          username:  'required|min:3',
          email: 'required|email',
          pass1: 'required|same:pass2',
          workplace: 'required|alpha|min:10',
          birth: 'required|date',
          phonenumber: 'required|number',
          home: 'required|alpha|min:10',

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
        user.phonenumber = data.phonenumber
        user.birth = data.birth
        yield user.save()

        yield res.sendView('register', { registerMessage : registerMessage.success })
    }
}

module.exports = RegisterController
