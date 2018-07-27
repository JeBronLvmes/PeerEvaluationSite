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
* Professor Profile Page
    * Click the professor name on the top left in the navbar to get here.
    * Here a professor can delete courses as well as edit their profile.
    * The view communicates directly with rails controllers, mainly `professor#show`
    * Makes calls to other controllers through links
    * Source located at `\app\views\professors\show.html.erb`
    * Edit Profile source page at `app\views\professors\edit.html.erb`
    
* Professor Course Page
    * Under the courses navbar link when logged in as a professor.
    * Here a professor can add courses and manage students as well as groups.
        * To add a course click "Add Course" and fill out the form in that appears below the button.
        * To add a student to a class, click the class, query the student by any one of the query fields and click add.
        * Only students in the selected class will appear in the dropdown to add a student to a group
    * Professors can switch between viewing students and group by the buttons on the top left corner.
    * Angular javascript controller `content.js` handles API calls to desired rails controller; mainly `courses_controller`.
        * located at `\app\assets\javascripts\`
        * This controller also handles dynamic changes of the site.
    * Page source directory at `\app\views\courses\index.html.erb`.
        * Partial located at `\app\views\professors\partials\_professor_courses_index.erb`.

* Professor Evaluations Page
    * Under the Evaluations navbar link when logged in as a professor.
    * Here a professor can manage Evaluation forms
        * To create a new form click the "+" icon next to the "Evaluations" heading on the top left
        * To assign the form to students click a class on the left then click the "Professor Forms" button on the top left
            * Click "Assign Form" on the desired form to push this form to all students in a class
    * Angular javascript controller `contentEvaluations.js` handles API calls to the rails controller.
        * located at `\app\assets\javascripts\`
        * Handles dynamic page changes
    * Page source directory at `\app\views\professor_forms\index.html.erb`
        * Partial located at `\app\views\professors\partials\_professor_forms_index.erb`
    * New Professor Form page at `\app\views\professor_forms\show.html.erb`
        * Partials at `\app\views\professors\partials`

* Students Profile Page
    * Click the student's name on the top left in the navbar to get here.
    * Here a student can view the link to edit or cancel their account and view and drop courses.
    * The view communicates directly with rails controllers, mainly `student#show`
    * Source located at `\app\views\students\show.html.erb`
    * Edit Profile source page at `app\views\students\edit.html.erb`
            
* Students Course Page
    * Here a student can view their Courses, Groups and the evaluations that need to be filled.
        * To complete an evaluation, click "Complete Evaluation", fill out the Answers field and click "submit".
    * The angular javascript controller `student.js` handles API calls to the rails controller
    * Page source located at `\app\views\students\get_courses.html.erb`
    
* Students Evaluation Page
    * Under the Evaluations navbar link
    * Here a student can view which evaluations they've completed and which they have not.
    * Page source located at `\app\views\students\get_evaluations.html.erb`



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
students for a group, deleting a course from the professor profile page, students dropping classes.
Implemented styling of pages. Implemented Add Course button and form on Professor Course page. 
Set up relations and majority of the model. Did work on students profile page. 
Implemented students filling out evaluations. Did the readme.

Bin Chen - Wrote 7 controller method include query method for courses, wrote lots of ajax code in content.js

Houyi Fan - Wrote following controller method for student and professor: get_courses, get_groups, get_evaluations, edit, create, update, destroy for student_controller; show, edit, update, destroy for professor_controller. Created and implemented views(static version) for student pages. Implemented Add Form button in professor's evaluation page. Added "edit profile" and "cancel account" choices in student and professor's profile page. Added some tests.
