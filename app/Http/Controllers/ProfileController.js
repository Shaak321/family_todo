'use strict'
const Database = use('Database')
const User = use('App/Model/User')
const Family = use('App/Model/Family')
const Todo = use('App/Model/Todo')
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
     const familyIdsForCurrentUser = yield Database.from('user_family').select('family_id').where(function(){
         this.where('username',username)
     })
     let families = []
     for(const family_id of familyIdsForCurrentUser){
         const family = yield Family.find(family_id.family_id)
         families.push(family)
     }
     //construct todo object
      const specifiedUsername = yield Database.from('users').select('username').where(function(){
         this.where('id',userId)
     })

     const familyIdsofSpecifiedUser = yield Database.from('user_family').select('family_id').where(function(){
         this.where('username',specifiedUsername)
     })

     let membersOfFamiliesOfSpecifiedUser = []
     for(family of familyIdsofSpecifiedUser){
         membersOfSpecifiedFamily = yield Database.from('user_family').select('user_id').where(function(){
             this.where('family_id',family)
             membersOfFamiliesOfSpecifiedUser.push(membersOfSpecifiedFamily)
         })
     }

     var isCurrentUserPartOfTheSameFamilyAsSpecifiedUser = false;
     for(actualMemberOfSpecifiedUsersFamilies of membersOfFamiliesOfSpecifiedUser){
         if(actualMemberOfSpecifiedUsersFamilies == req.currentUser.id){
             isCurrentUserPartOfTheSameFamilyAsSpecifiedUser = true
             break;
         }
     }

     var todos;
     const allMembersOfFamiliesOfSpecifiedUser = Database.from('user_family').select('user_id')
     if(isCurrentUserPartOfTheSameFamilyAsSpecifiedUser){
        todos = yield Database.from('todo').where('user_id',userId)
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
