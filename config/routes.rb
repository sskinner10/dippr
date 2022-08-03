Rails.application.routes.draw do
  root 'sauces#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  resources :sauces, only: [:index, :new, :create]

  get "/sauces/:id", to: "sauces#show"

  namespace :api do
    namespace :v1 do 
      resources :sauces, only: [:show]
    end 
  end 
end
