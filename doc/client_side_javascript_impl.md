# Client side javascript implementation

1.
 **Login with ajax and modal view:** When you hit the sign in button, a modal view
 comes up, that asks for you credentials.

 Changed files:
  * resources/views/index.njk
  * public/scripts/ajaxLogin.js
  * app/Http/Controllers/LoginController.js
  * resources/views/navbar.njk
  * resources/views/login.njk

2.
**Make family deletion ajax ready:** If you have javascript enabled, than
family deletions uses ajax request-response model.

Changed files:
  * public/scripts/familyDeleteAjax.js
  * app/Http/Controllers/FamilyController.js
  * resources/views/family.njk

3.
**Make todo deletion ajax ready:** If you have javascript enabled, than
todo deletions uses ajax request-response model.
Changed files:
  * public/scripts/ajaxDelete.js
  * app/Http/Controllers/TodoController.js
  * resources/views/todo.njk

4.
**Javascript clock:** As time flies on this site, if javascript is enabled in your browser, a clock will be shown, on the navbar.

Changed files:
* resources/views/index.njk
* resources/views/navbar.njk

5.
**Tooltips:** With javascript enabled, you can see handy tooltips when hovering your cursor over the navbar's menu items.

Changed files:
* resources/views/navbar.njk
