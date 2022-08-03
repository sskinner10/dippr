Rails.application.routes.draw do
  root 'sauces#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  get "/sauces/:id", to: "sauces#show"

  resources :sauces, only: [:index, :new, :create]

  namespace :api do
    namespace :v1 do 
      resource :sauce, only: [:show]
    end 
  end 
end
