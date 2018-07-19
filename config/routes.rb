Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  resources :students
  get 'login_page/login_general'
  get 'login_page/login_student'
  get 'login_page/login_professor'
  root 'login_page#index'

end
