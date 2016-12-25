# Non Functional requiremets

 * Usability  
    * The webpage should be nice to the eyes and easy to read, self-explanatory.
    Users should be able to use it without documentation.
    The usage of the administrator's pane should be obvious after reading the documentation
 * Performance  
    * The website needs to be able to handle around 40-50 requests and loading of pages should not take more than 2 seconds.
 * Availability
    * The webpage should be online around 99% of the year.
 * Scalability
    * At this point the webpage should not be able to scale distributed servers
 * Security
    * User passowords should be encoded with SHA256
    * Illegal arguments should be catched and handled properly
      * Use error messages
      * Ability to retype erroneous inputs
    * Fields public to the users, should be validated against harmful code  
      * View should be decoupled from data and control.
