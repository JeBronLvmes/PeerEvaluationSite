Rails.application.routes.draw do
  devise_for :students, path: 'students', controllers: { sessions: "students/sessions",registrations: "students/registrations",passwords: "students/passwords", confirmations: "students/confirmations", unlocks: "students/unlocks",profiles: "students/profiles" }
  devise_for :professors, path: 'professors', controllers: { sessions: "professors/sessions",registrations: "professors/registrations",passwords: "professors/passwords", confirmations: "professors/confirmations", unlocks: "professors/unlocks", }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  resources :students do
    resources :courses_student, :courses, :evaluations
    get 'groups'
  end



  resources :professors do
    resources :courses do
      resources :professor_forms
    end
    get 'groups'
  end

  resources :students, :professors, :evaluations, :groups, :courses_student, :professor_forms
  get 'login/index'
  get 'login/student'
  get 'login/professor'
  get 'evaluations/new'


  get  'professors/:pro_id/courses/:course_id/professor_forms/:course_id/form/:id', to: 'professor_forms#show_individual_form'
  root to: 'login#index'

end
