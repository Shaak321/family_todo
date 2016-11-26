'use strict'
const Database = use('Database')
const User = use('App/Model/User')
const Family = use('App/Model/Family')
const Todo = use('App/Model/Todos')
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
     const userInfo = yield Database.from('users').select('name','username','email','home','workplace','birth').where(function(){
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
}

module.exports = ProfileController
