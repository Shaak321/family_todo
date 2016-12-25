# Endpoints:

* GET:  /  : Get the Homepage
* GET:  /register   : Get the registration page
* POST:  /register   : Send registration data
* GET:  /login    : Get login page
* POST:  /login    : Get login data
* POST:  /logout   : send log out information  
* GET:  /profile/:id  : Get particular profile information
* GET:  /family/:id    : Get a particular family information
* GET:  /todo/:id   : Get a particular todo information
* GET:  /addTodo    : Get add todo page
* POST:  /addTodo   : Send add todo information
* GET:  /addFamily  : Get add Family page  
* POST:  /addFamily : Send information to add a family   
* GET:  /delete/todo/:id  : Delete a particular todo identified by id
* GET:  /modify/todo/:id   : Get todo modification page for a particular todo
* POST:  /modify/todo/:id   : Send changed information for a particular todo, that has been modified
* GET:  /family_delete/:id   : Delete a particular family
* GET:  /family_modify/:id   : Get family modification page for a particular family
* POST:  /family_modify/:id  :Send changed information for a particular family, that has been modified  
* GET:  /add_family_member/:id   : Get add family member page
* POST:  /add_family_member/:id  : Send information due to addition of a new family member
* GET:  /my_families   : Get a list of my families
* GET:  /my_todos   : Get a list of my todos
* GET:  /error    : Use as an endpoint in case of errors.
* GET:  /mark_todo_as_complete/:id   : Mark a todo as complete with a particular id.
* GET:  /modify_profile/:id   : Get profile modification page
* POST:  /modify_profile/:id  : Send modified profile data
* GET:  /delete_profile/:id   : Delete a particular profile
* GET:  /delete_member/:family_id/:username : Delete a particular family member from a particular family based on their ids.
