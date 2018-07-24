Rails.application.routes.draw do
  devise_for :students, path: 'students', controllers: { sessions: "students/sessions",registrations: "students/registrations",passwords: "students/passwords", confirmations: "students/confirmations", unlocks: "students/unlocks",profiles: "students/profiles" }
  devise_for :professors, path: 'professors', controllers: { sessions: "professors/sessions",registrations: "professors/registrations",passwords: "professors/passwords", confirmations: "professors/confirmations", unlocks: "professors/unlocks", }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'professors/:pro_id/professor_forms/:course_id', to: 'professor_forms#get_forms'
  resources :students do
    resources :courses_student, :courses
    get 'groups'
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


  # add a group to the course
  post 'professors/:professor_id/courses/:course_id/group', to: 'courses#add_group'

  # get all of the courses from one professor
  get 'professors/:pro_id/get_courses', to: 'courses#get_courses'

  # get all of the students in the course
  get 'professors/:pro_id/courses/:course_id/students', to: 'courses#get_students'

  # get all of the groups in the course
  get 'professors/:pro_id/courses/:course_id/groups', to: 'courses#get_groups'

  # add a student to a course
  post 'professors/:pro_id/courses/:course_id/add_std', to: 'courses#add_std'

  # delete a student from a course
  delete 'professors/:pro_id/courses/:course_id/del_std/:std_id', to: 'courses#delete_std'

  # query the students that qualified with some conditions
  get 'studentSearch', to: 'students#search'



  root to: 'login#index'

end

