Rails.application.routes.draw do
  devise_for :students, path: 'students', controllers: { sessions: "students/sessions",registrations: "students/registrations",passwords: "students/passwords", confirmations: "students/confirmations", unlocks: "students/unlocks",profiles: "students/profiles" }
  devise_for :professors, path: 'professors', controllers: { sessions: "professors/sessions",registrations: "professors/registrations",passwords: "professors/passwords", confirmations: "professors/confirmations", unlocks: "professors/unlocks", }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'professors/:pro_id/professor_forms/new', to: 'professor_forms#new'
  post 'professors/:pro_id/create_professor_forms', to: 'professor_forms#create_evaluation'
  get 'professors/:pro_id/get_professor_forms/:course_id', to: 'professor_forms#get_forms'
  get 'professors/:pro_id/professor_forms/:course_id/form/:id', to: 'professor_forms#show_individual_form'
  post 'professors/:pro_id/professor_forms/:course_id/form/:form_id/post_evaluation', to: 'evaluations#create_evaluation_to_student'
  get 'students/:student_id/evaluations_completed', to: 'students#completed_evaluations_list'
  get 'students/:student_id/evaluations_incomplete', to: 'students#incomplete_evaluations_list'

  resources :students do
    resources :courses_student
  end

  resources :professors do
    resources :courses,:professor_forms
    get 'groups'
  end

  resources :students, :professors, :evaluations, :groups, :professor_forms
  get 'login/index'
  get 'login/student'
  get 'login/professor'
  get 'evaluations/new'


  ###### Students
  # post student's answers to evaluation
  post 'students/:student_id/courses/:course_id/eval/:eval_id', to: 'evaluations#post_answer'

  # get incomplete evaluations for a specific course
  get 'students/:student_id/courses/:course_id/eval_incomplete', to: 'students#course_incomplete_eval'

  # get incomplete evaluations for a specific course
  get 'students/:student_id/courses/:course_id/eval_complete', to: 'students#course_complete_eval'

  # get specific evaluation for students to complete
  get 'students/:student_id/courses/:course_id/eval/:eval_id', to: 'students#get_eval'

  # get all evaluations
  get 'students/:student_id/courses/:course_id/eval/', to: 'students#get_evals'

  # get all of the courses in the student
  get 'students/:id/get_courses', to: 'students#get_courses'

  # get all of the groups in the student
  get 'students/:id/get_groups', to: 'students#get_groups'

  # get all of the evaluations in the student
  get 'students/:id/get_evaluations', to: 'students#get_evaluations'

  # get student's course list
  get 'students/:student_id/courses/', to: 'students#get_course_list'

  # get specific course info
  get 'students/:student_id/courses/:course_id', to: 'students#show_course'

  # get course specific group for student
  get 'students/:student_id/courses/:course_id/group/', to: 'students#show_group'

  ###### Professors

  #delete course and render json
  delete 'professors/:professor_id/destroy/:course_id', to: 'courses#delete_course'

  #delete student from group
  delete 'professors/:professor_id/courses/:course_id/groups/:group_id/students/:id',
         to: 'courses#delete_group_student'

  # add student to group
  post 'professors/:professor_id/courses/:course_id/groups/:group_id/students/:id',
       to: 'courses#add_group_student'

  # get group student list
  get 'professors/:professor_id/courses/:course_id/groups/:group_id/students',
      to: 'courses#get_group_students'

  # add a group to the course
  post 'professors/:professor_id/courses/:course_id/group', to: 'courses#add_group'

  # delete a group from the course
  delete 'professors/:professor_id/courses/:course_id/group/:group_id', to: 'courses#delete_group'

  # get all of the courses from one professor
  get 'professors/:pro_id/get_courses', to: 'courses#get_courses'

  # get all of the students in the course
  get 'professors/:pro_id/courses/:course_id/students', to: 'courses#get_students'

  # get all of the groups in the course
  get 'professors/:pro_id/courses/:course_id/groups', to: 'courses#get_groups'

  # add a student to a group
  post 'professors/:pro_id/courses/:course_id/add_group_student', to: 'courses#add_group_student'

  # get all of the courses in the student
  get 'students/:id/get_courses', to: 'students#get_courses'

  # get all of the groups in the student
  get 'students/:id/get_groups', to: 'students#get_groups'

  # get all of the evaluations in the student
  get 'students/:id/get_evaluations', to: 'students#get_evaluations'

  # add a student to a course
  post 'professors/:pro_id/courses/:course_id/add_std', to: 'courses#add_std'

  # delete a student from a course
  delete 'professors/:pro_id/courses/:course_id/del_std/:std_id', to: 'courses#delete_std'

  # query the students that qualified with some conditions
  get 'studentSearch', to: 'students#search'



  root to: 'login#index'

end

