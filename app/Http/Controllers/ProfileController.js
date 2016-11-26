'use strict'
const Database = use('Database')
const User = use('App/Model/User')
const Family = use('App/Model/Family')
const Todo = use('App/Model/Todos')
const Hash = use('Hash')
const Validator = use('Validator')
class ProfileController {
 *show(req,res){
     if(req.currentUser){
     const currentUser = req.currentUser
     const userId = req.param('id');
     //Catch if username is undefined
     const username = yield Database.from('users').select('username').where(function(){
         this.where('id',userId);
     })


     //construct user information object
     const userInfo = yield Database.from('users').select('id','name','username','email','home','workplace','birth').where(function(){
         this.where('id',userId)
     })
     //construct family object
     const familyIdsForCurrentUser = yield Database.from('user_families').select('family_id').where(function(){
         this.where('username',username[0].username)
     })
     
     let families = []
     
     for(const family_id of familyIdsForCurrentUser){
         console.log(family_id)
         const family = yield Family.find(family_id.family_id)
         families.push(family)
     }
     //construct todo object
      const specifiedUsername = yield Database.from('users').select('username').where(function(){
         this.where('id',userId)
     })
     //Construct of isCurrentUserPartOfTheSameFamilyAsSpecifiedUser
     const familyIdsofSpecifiedUser = yield Database.from('user_families').select('family_id').where(function(){
            this.where('username',specifiedUsername[0].username)
        })
        
        let membersOfFamiliesOfSpecifiedUser = []
        for(let family of familyIdsofSpecifiedUser){
            var membersOfSpecifiedFamily = yield Database.from('user_families').select('username').where(function(){
                this.where('family_id',family.family_id)
            })
            membersOfFamiliesOfSpecifiedUser.push(membersOfSpecifiedFamily)
        }
        var isCurrentUserPartOfTheSameFamilyAsTodosOwner = false;
        for(let actualMemberOfSpecifiedUsersFamilies of membersOfFamiliesOfSpecifiedUser){
              for(let membersOfParticularFamily of actualMemberOfSpecifiedUsersFamilies){
                if(membersOfParticularFamily.username == req.currentUser.username){
                    isCurrentUserPartOfTheSameFamilyAsTodosOwner = true
                    break;
                }
            }
        }
       
  //End of Construct of isCurrentUserPartOfTheSameFamilyAsSpecifiedUser
     var todos;
     if( userId == currentUser.id || isCurrentUserPartOfTheSameFamilyAsTodosOwner){
        todos = yield Database.from('todos').where('user_id',userId)
     }
     yield res.sendView('profile',{
            userInfo: userInfo,
            families: families,
            todos: todos
		})



 }else {
     res.sendView('register')
 }
 } 

 *modify(req,res){
     if(req.currentUser){
         const userId = req.param('id')
         var user = yield User.findBy('id',userId)
         if(user){
             if(user.id == req.currentUser.id){
             yield res.sendView('modifyProfile',{
                 user:user
             })}else{
                  yield req
                                .withAll()
                                .andWith({ errors: [{message: "You can not modify this user profile"}] })
                                .flash()

                            res.redirect('/error')
                            return
             }
         }else{
             yield req
                                .withAll()
                                .andWith({ errors: [{message: "No such user!"}] })
                                .flash()

                            res.redirect('/error')
                            return
         }
     }
 }

    *doModify(req,res){
        if(req.currentUser){
            const userId = req.param('id')
            var user = yield User.findBy('id',userId)
            if(user){
                if(user.id == req.currentUser.id){
                                var modifyMessage = {
                        success: 'Whoooooo! You just modified your profile!',
                        password_mismatch: 'Password doesn\'t match'
                    }

                    const data = {
                    name: req.input('name'),
                    email: req.input('email'),
                    home: req.input('home'),
                    workplace: req.input('workplace'),
                    birth: req.input('birth'),
                    oldpass: req.input('oldpass'),
                    pass1: req.input('new_password1'),
                    pass2: req.input('new_password2')
                    }
                    var newPasswordPresent = false;
                    if(data.pass1  && data.pass2){
                       newPasswordPresent=true
                        const isSameOldPass = yield Hash.verify(data.oldpass,user.password)
                        if(!isSameOldPass){
                            yield req
                                .withAll()
                                .andWith({ errors: [{message: 'Old password is incorrect!'}] })
                                .flash()

                            res.redirect('/modify_profile/'+req.currentUser.id)
                            return
                        }
                    }
                    const rules = {
                    name: 'required|min:8',
                    email: 'required|email',
                    pass1: 'same:pass2',
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

                         res.redirect('/modify_profile/'+req.currentUser.id)
                        return
                    }

                    
                    user.name = data.name
                   
                    user.email = data.email
                    if(newPasswordPresent){
                        user.password = yield Hash.make(data.pass1)
                    }
                    user.home = data.home
                    user.workplace = data.workplace
                    user.birth = data.birth
                    yield user.save()

                    yield res.sendView('index', { modifyMessage : modifyMessage.success })
                }
            }
        }
    }

    *delete(req,res){
         if(req.currentUser){
            const userId = req.param('id')
            var user = yield User.findBy('id',userId)
            if(user){
                        if(user.id == req.currentUser.id){
                            yield Database.from('user_families').delete().where(function(){
                                this.where('username',user.username)
                            })

                            yield Database.from('todos').delete().where(function(){
                                this.where('user_id',user.id)
                            })
                            user.delete()
                            yield res.redirect('/logout')
                        }else{
                            yield req
                                    .withAll()
                                    .andWith({ errors: [{message: 'You can not delete this profile'}] })
                                    .flash()

                                res.redirect('/error')
                                return
                        }
            }else{
                             yield req
                                    .withAll()
                                    .andWith({ errors: [{message: 'No such user'}] })
                                    .flash()

                                res.redirect('/error')
                                return  
            }
        }
    }
}
module.exports = ProfileController
