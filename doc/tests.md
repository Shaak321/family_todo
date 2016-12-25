# Tests
Tool: SELENIUM IDE (https://addons.mozilla.org/hu/firefox/addon/selenium-ide/)

**Files:**
  * tests/add_new_family/add_new_family.xml
  
    * User logs in, creates a new family, then with My families tab, validates, that
      the family do exists, then signs out.

  * tests/add_new_todo/add_new_todo.xml
    * User logs in, creates a new todo, then with my todo tab, validates that the new todo do exists, than logs out.


  * tests/login_test_case/login.xml
    * User logs in, then logs out.


  * tests/mark_todo_as_complete/mark_todo_as_complete.xml

    * User logs in, create a todo, then on my todos, tab selects it, then mark it as complete, than again, on my todos tab, modifies it, so it is not completed anymore, then logs out.


  * tests/modify_user_info/modify_user_info.xml

     * User logs in, on edit profile tab, changes its name, save changes, then again on edit profile tab, reenter the original name, saves it. Logs out.
