Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  resources :students
  resources :professors
  get 'login/index'
  get 'login/student'
  get 'login/professor'
  root 'login#index'

end
