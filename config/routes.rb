Rails.application.routes.draw do
  devise_for :students, path: 'students', controllers: { sessions: "students/sessions",registrations: "students/registrations",passwords: "students/passwords", confirmations: "students/confirmations", unlocks: "students/unlocks",profiles: "students/profiles" }
  devise_for :professors, path: 'professors', controllers: { sessions: "professors/sessions",registrations: "professors/registrations",passwords: "professors/passwords", confirmations: "professors/confirmations", unlocks: "professors/unlocks", }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  resources :students do
    resources :courses_student
  end
  resources :students, :professors, :courses, :evaluations, :groups, :courses_student
  get 'login/index'
  get 'login/student'
  get 'login/professor'
  get 'evaluations/new'
  root to: 'login#index'

end
