'use strict'
const Database = use('Database')
class TodoController {
    *get(req,res){
        if(req.currentUser){
            const todoId = req.param('id');

            const ownerOfTodo = yield Database.from('todo').select('user_id').where(function(){
                this.where('id',todoId)
            })
            console.log('After ownerOfTodo')
            const ownerOfTodoUserName =  yield Database.from('users').select('username').where(function(){
                this.where('id',ownerOfTodo)
            })
            console.log('After ownerOfTodoUserName')
     //construct todo object
    
     const familyIdsofSpecifiedUser = yield Database.from('user_family').select('family_id').where(function(){
         this.where('username',"proba")
     })
      console.log('After familyIdsofSpecifiedUser')
     let membersOfFamiliesOfSpecifiedUser = []
     for(family of familyIdsofSpecifiedUser){
        var membersOfSpecifiedFamily = yield Database.from('user_family').select('user_id').where(function(){
             this.where('family_id',family)
             membersOfFamiliesOfSpecifiedUser.push(membersOfSpecifiedFamily)
         })
     }
    console.log('After  for(family of familyIdsofSpecifiedUser)')
     var isCurrentUserPartOfTheSameFamilyAsSpecifiedUser = false;
     for(actualMemberOfSpecifiedUsersFamilies of membersOfFamiliesOfSpecifiedUser){
         if(actualMemberOfSpecifiedUsersFamilies == req.currentUser.id){
             isCurrentUserPartOfTheSameFamilyAsSpecifiedUser = true
             break;
         }
     }
 console.log('After  var isCurrentUserPartOfTheSameFamilyAsSpecifiedUser = false;')
            var owner = {}
            var todo = {}
            if(ownerOfTodo == req.currentUser.id ||isCurrentUserPartOfTheSameFamilyAsSpecifiedUser ){
                owner = yield Database.from('users').select('name').where(function(){
                    this.where('id',ownerOfTodo)
                })
                todo = yield Database.from('todo').where(function(){
                    this.where('id',todoId)
                })
               yield res.sendView('todo',{
                    todo:todo,
                    owner:owner
                }
                ) 
            }else{
                
                yield res.sendView('todo',{
                    todo:todo,
                    owner:owner
                })
                console.log('After  res.sendView')
            }

        }else{
          yield res.sendView('register') 
        }
    }
}

module.exports = TodoController
