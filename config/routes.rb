Rails.application.routes.draw do

  resources :inventions, only: [:index, :show, :new, :create]
  resources :materials, only: [:index]

  root 'home#index'

end
