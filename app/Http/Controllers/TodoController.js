'use strict'
const Database = use('Database')
const Todo = use('App/Model/Todos')
const Validator = use('Validator')
class TodoController {
    *delete(req,res){
        const todoId = req.param('id')
        let ownerOfTodo = yield Database.from('todos').select('user_id').where(function(){
            this.where('id',todoId)
        })
        
        if(req.currentUser){
            if(ownerOfTodo[0].user_id == req.currentUser.id){
                const todoToDelete = yield Todo.find(todoId)
                yield todoToDelete.delete()
                yield res.sendView('index')
            }else{
                
                 yield req
                                .withAll()
                                .andWith({ errors: [{message: "You can not delete this todo"}] })
                                .flash()

                            res.redirect('/error')
            }
        }

    }
    *getAll(req,res){
        if(req.currentUser){
            let myTodos = yield Database.from('todos').select('name','id').where(function(){
                this.where('user_id',req.currentUser.id)
            })
            console.log(myTodos)
            yield res.sendView('myTodos',{
                myTodos:myTodos
            })
        }else{
            yield res.sendView('register')
        }
    }


    *modify(req,res){
          const todoId = req.param('id')
       
        if(req.currentUser){
        let todo = yield Todo.find(todoId)
        if(todo){
            if(todo.user_id == req.currentUser.id){
                    yield res.sendView('editTodo',{
                        todo:todo
                    })
                }else{
                     yield req
                                .withAll()
                                .andWith({ errors: [{message: "You can not edit this todo"}] })
                                .flash()

                            res.redirect('/error')
                }
            }
        }
    }

    *doModify(req,res){
            const todoId = req.param('id')
        
            if(req.currentUser){
            let todo = yield Todo.find(todoId)
            if(todo){
                if(todo.user_id == req.currentUser.id){
                         var ModifyTodoMessage = {
            success: 'Whoooooo! You have just modified your todo!',
        }
        const data = {
          name: req.input('name'),
          description:  req.input('description'),
          start: req.input('start'),
          end: req.input('end'),
          iscompleted: req.input('iscompleted')
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
            res.redirect('/modify/todo/'+todoId)
            return
        }
        todo.name = data.name
        todo.description = data.description
        todo.start = data.start
        todo.end = data.end
        todo.user_id = req.currentUser.id
        if(data.iscompleted){
            console.log('TRUE')
            todo.iscompleted = true
        }else{
            console.log('FALSE')
            todo.iscompleted = false
        }
        console.log(todo.iscompleted)
        yield todo.save()

                yield res.sendView('editTodo', { ModifyTodoMessage : ModifyTodoMessage.success ,todo:todo})
                    }else{
                        yield req
                                .withAll()
                                .andWith({ errors: [{message: "You can not edit this todo"}] })
                                .flash()

                            res.redirect('/error')
                    }
                }
            }
        }

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
        console.log(familyIdsofSpecifiedUser)
        let membersOfFamiliesOfSpecifiedUser = []
        for(let family of familyIdsofSpecifiedUser){
            var membersOfSpecifiedFamily = yield Database.from('user_families').select('username').where(function(){
                this.where('family_id',family.family_id)
            })
            membersOfFamiliesOfSpecifiedUser.push(membersOfSpecifiedFamily)
        }
        console.log(membersOfFamiliesOfSpecifiedUser)
        var isCurrentUserPartOfTheSameFamilyAsTodosOwner = false;
        for(let actualMemberOfSpecifiedUsersFamilies of membersOfFamiliesOfSpecifiedUser){
            for(let membersOfParticularFamily of actualMemberOfSpecifiedUsersFamilies){
                if(membersOfParticularFamily.username == req.currentUser.username){
                    isCurrentUserPartOfTheSameFamilyAsTodosOwner = true
                    break;
                }
            }
        }
       console.log(isCurrentUserPartOfTheSameFamilyAsTodosOwner)
    //End-of-construct-isCurrentUserPartOfTheSameFamilyAsSpecifiedUser
            var owner = {}
            var todo = {}
            if(ownerOfTodo[0].user_id == req.currentUser.id ||isCurrentUserPartOfTheSameFamilyAsTodosOwner ){
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
