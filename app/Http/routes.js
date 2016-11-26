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
Route.post('/logout', 'LoginController.logout').middleware('auth')
Route.get('/profile/:id','ProfileController.show').middleware('auth')
Route.get('/family/:id', 'FamilyController.get').middleware('auth')
Route.get('/todo/:id','TodoController.get').middleware('auth')
Route.get('/addTodo', 'TodoController.add').middleware('auth')
Route.post('/addTodo', 'TodoController.doAdd').middleware('auth')
Route.get('/addFamily', 'FamilyController.add').middleware('auth')
Route.post('/addFamily', 'FamilyController.doAdd').middleware('auth')
Route.get('/delete/todo/:id','TodoController.delete').middleware('auth')
Route.get('/modify/todo/:id','TodoController.modify').middleware('auth')
Route.post('/modify/todo/:id','TodoController.doModify').middleware('auth')
Route.get('/family_delete/:id','FamilyController.delete').middleware('auth')
Route.get('/family_modify/:id','FamilyController.modify').middleware('auth')
Route.post('/family_modify/:id','FamilyController.doModify').middleware('auth')
Route.get('/add_family_member/:id','FamilyController.addMember').middleware('auth')
Route.post('/add_family_member/:id','FamilyController.doAddMember').middleware('auth')
Route.get('/my_families','FamilyController.getAll').middleware('auth')
Route.get('/my_todos','TodoController.getAll').middleware('auth')
Route.get('/error','ErrorController.show').middleware('auth')
Route.get('/mark_todo_as_complete/:id','TodoController.markAsComplete').middleware('auth')
Route.get('/modify_profile/:id','ProfileController.modify').middleware('auth')
Route.post('/modify_profile/:id','ProfileController.doModify').middleware('auth')
Route.get('/delete_profile/:id','ProfileController.delete').middleware('auth')