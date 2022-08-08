Rails.application.routes.draw do
  root 'sauces#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  resources :sauces, only: [:index, :new, :create, :edit, :update, :destroy]

  get "/sauces/:id", to: "homes#index"
  get "/users/:id", to: "homes#index"

  namespace :api do
    namespace :v1 do 
      resources :sauces, only: [:show] do 
        resources :reviews, only: [:show, :create]
      end 
      resources :users, only: [:show]
    end 
  end 

 
  #   namespace :v1 do 
  #     resources :reviews, only: [:show]
  #   end 
  # end 
end
