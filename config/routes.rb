Rails.application.routes.draw do
  devise_for :users, skip: :all
  root to: 'application#index'

  namespace :api, constraints: { format: 'json' } do
    post 'login', to: 'base#login'

    post 'user', to: 'users#create'
    get 'user', to: 'users#info'

    post 'post', to: 'posts#create'
    get 'posts', to: 'posts#index'
  end
end
