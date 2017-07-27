Rails.application.routes.draw do

  resources :inventions, only: :index

  root 'inventions#index'

end
