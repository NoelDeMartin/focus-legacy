Rails.application.routes.draw do
  root 'home#index'

  get  'login',  to: 'auth#show'
  post 'login',  to: 'auth#login'
  get  'logout', to: 'auth#logout'

  get 'admp/registered'
  get 'admp/authorized'

  post 'callback', to: 'autonomous_data#callback'
  get 'redirect', to: 'autonomous_data#redirect'
end
