'use strict'
const Database = use('Database')
const Todo = use('App/Model/Todos')
const Validator = use('Validator')
class TodoController {
    *get(req,res){
        if(req.currentUser){
            const todoId = req.param('id');

            const ownerOfTodo = yield Database.from('todos').select('user_id').where(function(){
                this.where('id',todoId)
            })
           
            const ownerOfTodoUserName =  yield Database.from('users').select('username').where(function(){
                this.where('id',ownerOfTodo[0].user_id)
            })
            
     //construct todo object
    //Construct isCurrentUserPartOfTheSameFamilyAsSpecifiedUser
   
        const familyIdsofSpecifiedUser = yield Database.from('user_families').select('family_id').where(function(){
            this.where('username',ownerOfTodoUserName[0].username)
        })
        
        let membersOfFamiliesOfSpecifiedUser = []
        for(let family of familyIdsofSpecifiedUser){
            var membersOfSpecifiedFamily = yield Database.from('user_families').select('username').where(function(){
                this.where('family_id',family.family_id)
            })
            membersOfFamiliesOfSpecifiedUser.push(membersOfSpecifiedFamily)
        }
        var isCurrentUserPartOfTheSameFamilyAsSpecifiedUser = false;
        for(let actualMemberOfSpecifiedUsersFamilies of membersOfFamiliesOfSpecifiedUser){
            if(actualMemberOfSpecifiedUsersFamilies[0].username == req.currentUser.username){
                isCurrentUserPartOfTheSameFamilyAsSpecifiedUser = true
                break;
            }
        }
       
    //End-of-construct-isCurrentUserPartOfTheSameFamilyAsSpecifiedUser
            var owner = {}
            var todo = {}
            if(ownerOfTodo[0].user_id == req.currentUser.id ||isCurrentUserPartOfTheSameFamilyAsSpecifiedUser ){
                owner = yield Database.from('users').select('name').where(function(){
                    this.where('id',ownerOfTodo[0].user_id)
                })
                todo = yield Database.from('todos').where(function(){
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
                
            }

        }else{
          yield res.sendView('register') 
        }
    }

    *add(req,res){
        if(req.currentUser){
        yield res.sendView('add_todo');
        }else{
            yield res.sendView('register')
        }
    }

    *doAdd(req,res){
        if(req.currentUser){
          var addTodoMessage = {
            success: 'Whoooooo! You have just added a todo!',
        }
        const data = {
          name: req.input('name'),
          description:  req.input('description'),
          start: req.input('start'),
          end: req.input('end'),
        }
        const rules = {
          name: 'required|min:5', 
          description:  'required|min:10',
          start: 'required', //Add custrom rule
          end: 'required',  //Add custom rule
        }
         const validation = yield Validator.validateAll(data, rules)
        if(validation.fails()){
            yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            res.redirect('/addTodo')
            return
        }
         const todo = new Todo()
        todo.name = data.name
        todo.description = data.description
        todo.start = data.start
        todo.end = data.end
        todo.user_id = req.currentUser.id
        todo.iscompleted = false
        yield todo.save()

        yield res.sendView('add_todo', { addTodoMessage : addTodoMessage.success })
        }else{
            yield res.sendView('add_todo')
        }
    }
}

module.exports = TodoController
