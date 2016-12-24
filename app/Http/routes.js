'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')
Route.get('/','MainController.main')
Route.get('/register','RegisterController.register')
Route.post('/register', 'RegisterController.doRegister')
Route.get('/login', 'LoginController.login')
Route.post('/login', 'LoginController.doLogin').middleware('auth')
Route.post('/logout', 'LoginController.logout').middleware('author')
Route.get('/profile/:id','ProfileController.show').middleware('author')
Route.get('/family/:id', 'FamilyController.get').middleware('author')
Route.get('/todo/:id','TodoController.get').middleware('author')
Route.get('/addTodo', 'TodoController.add').middleware('author')
Route.post('/addTodo', 'TodoController.doAdd').middleware('author')
Route.get('/addFamily', 'FamilyController.add').middleware('author')
Route.post('/addFamily', 'FamilyController.doAdd').middleware('author')
Route.get('/delete/todo/:id','TodoController.delete').middleware('author')
Route.get('/modify/todo/:id','TodoController.modify').middleware('author')
Route.post('/modify/todo/:id','TodoController.doModify').middleware('author')
Route.get('/family_delete/:id','FamilyController.delete').middleware('author')
Route.get('/family_modify/:id','FamilyController.modify').middleware('author')
Route.post('/family_modify/:id','FamilyController.doModify').middleware('author')
Route.get('/add_family_member/:id','FamilyController.addMember').middleware('author')
Route.post('/add_family_member/:id','FamilyController.doAddMember').middleware('author')
Route.get('/my_families','FamilyController.getAll').middleware('author')
Route.get('/my_todos','TodoController.getAll').middleware('author')
Route.get('/error','ErrorController.show')
Route.get('/mark_todo_as_complete/:id','TodoController.markAsComplete').middleware('author')
Route.get('/modify_profile/:id','ProfileController.modify').middleware('author')
Route.post('/modify_profile/:id','ProfileController.doModify').middleware('author')
Route.get('/delete_profile/:id','ProfileController.delete').middleware('author')
Route.get('/delete_member/:family_id/:username','FamilyController.deleteMember').middleware('author')
Route.group('ajax', function() {
  Route.post('/login', 'LoginController.ajaxLogin')
  Route.get('/delete/todo/:id','TodoController.ajaxDelete').middleware('author')
}).prefix('/ajax')