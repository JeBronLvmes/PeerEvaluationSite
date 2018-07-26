# Project 6
### Ruby on Rails Project

#### Technologies and Frameworks
* Devise - for user authentication
* Angularjs - for appearance of pages
* Bootstrap - for HTML styling

#### Partitioning of Work
* Bin and Jeb - the majority of Courses functions
* Josh and Houyi - the majority of Evaluation functions

#### Organization and Structure
* Professor Course Page
    * Under the courses navbar link when logged in as a professor.
    * Here a professor can add courses and manage students as well as groups.
    * Professors can switch between viewing students and group by the buttons on the top left corner.
    * Angular javascript controller `content.js` handles API calls to desired rails controller; mainly `courses_controller`.
        * located at `\app\assets\javascripts\`
        * This controller also handles dynamic changes of the site.
    * Page source directory at `\app\views\courses\index.html.erb`.
        * Partial located at `\app\views\professors\partials\_professor_courses_index.erb`.
* Professor Profile Page
    * Here a professor can delete courses as well as edit their profile.
    * The view communicates directly with the rails controller `professor#show`
    * Makes calls to other controllers through links
    * Source located at `\app\views\professors\show.html.erb`
* Professor Evaluations Page
    * Angular javascript controller `contentEvaluations.js` handles API calls to the rails controller.
        * located at `\app\assets\javascripts\`
        * Handles dynamic page changes
    * Page source directory at `\app\views\professor_forms\index.html.erb`
        * Partial located at `\app\views\professors\partials\_professor_forms_index.erb`
    * New Professor Form page at `\app\views\professor_forms\show.html.erb`
        * Partials at `\app\views\professors\partials`
* Students Course Page
    * Here a student can view their Courses, Groups and the evaluations that need to be filled.
    * The angular javascript controller `student.js` handles API calls to the rails controller
    * Page source located at `\app\views\students\get_courses.html.erb`

### Roles
* Overall Project Manager: Josh Wright
* Coding Manager: Bin Chen
* Testing Manager: Jeb Alawi 
* Documentation: Houyi Fan

### Contributions
Please list who did what for each part of the project.
Also list if people worked together (pair programmed) on a particular section.


Josh Wright: Implemented the Devise user login system for professors and students
Implemented the Evaluations Page. Wrote Professor_form, Evaluations controller code and associated views.
Implemented some custom routes and contentEvaluation javascript file. 

Jeb Alawi - Wrote controller code for creating and adding courses to a professor, 
adding a group to a class, deleting groups, deleting students from groups, grabbing the list of
students for a group, deleting a course from the professor profile page. Implemented styling of pages
Implemented Add Course button and form on Professor Course page. Set up Students Course page.