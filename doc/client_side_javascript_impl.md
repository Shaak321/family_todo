# Client side javascript implementation

1.
 **Login with ajax and modal view:** When you hit the sign in button, a modal view
 comes up, that asks for you credentials.

 Changed files:
  * application/resources/views/index.njk
  * application/public/scripts/ajaxLogin.js
  * application/app/Http/Controllers/LoginController.js
  * application/resources/views/navbar.njk
  * application/resources/views/login.njk

2.
**Make family deletion ajax ready:** If you have javascript enabled, than
family deletions uses ajax request-response model.

Changed files:
  * application/public/scripts/familyDeleteAjax.js
  * application/app/Http/Controllers/FamilyController.js
  * application/resources/views/family.njk

3.
**Make todo deletion ajax ready:** If you have javascript enabled, than
todo deletions uses ajax request-response model.
Changed files:
  * application/public/scripts/ajaxDelete.js
  * application/app/Http/Controllers/TodoController.js
  * application/resources/views/todo.njk

4.
**Javascript clock:** As time flies on this site, if javascript is enabled in your browser, a clock will be shown, on the navbar.

Changed files:
* application/resources/views/index.njk
* application/resources/views/navbar.njk

5.
**Tooltips:** With javascript enabled, you can see handy tooltips when hovering your cursor over the navbar's menu items.

Changed files:
* application/resources/views/navbar.njk
