Rails.application.routes.draw do

  resources :inventions, only: [:index, :show, :new, :create]

  root 'home#index'

end
