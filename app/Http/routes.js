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

