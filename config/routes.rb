Rails.application.routes.draw do

  resources :inventions, only: [:index, :new, :create]

  root 'home#index'

end
