Rails.application.routes.draw do
  root 'sauces#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  resources :sauces, only: [:index, :new, :create, :edit, :update, :destroy]

  get "/sauces/:id", to: "homes#index"
  get "/users/:id", to: "homes#index"
  get "/users/:id/edit", to: "devise/registrations#edit"

  namespace :api do
    namespace :v1 do 
      resources :sauces, only: [:show] do 
        resources :reviews, only: [:create, :destroy]
      end 
      resources :users, only: [:show]
      resources :votes, only: [:create]
    end 
  end 
end
