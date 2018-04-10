Rails.application.routes.draw do
  root 'home#index'

  get  'login', to: 'auth#show'
  post 'login', to: 'auth#login'

  get 'admp/registered'
  get 'admp/authorized'
end
