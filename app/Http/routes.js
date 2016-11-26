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
Route.post('/login', 'LoginController.doLogin')
Route.post('/logout', 'LoginController.logout')
Route.get('/profile/:id','ProfileController.show')
Route.get('/family/:id', 'FamilyController.get')
Route.get('/todo/:id','TodoController.get')
Route.get('/addTodo', 'TodoController.add')
Route.post('/addTodo', 'TodoController.doAdd')
Route.get('/addFamily', 'FamilyController.add')
Route.post('/addFamily', 'FamilyController.doAdd')
Route.get('/delete/todo/:id','TodoController.delete')
Route.get('/modify/todo/:id','TodoController.modify')
Route.post('/modify/todo/:id','TodoController.doModify')
Route.get('/family_delete/:id','FamilyController.delete')
Route.get('/family_modify/:id','FamilyController.modify')
Route.post('/family_modify/:id','FamilyController.doModify')
Route.get('/add_family_member/:id','FamilyController.addMember')
Route.post('/add_family_member/:id','FamilyController.doAddMember')