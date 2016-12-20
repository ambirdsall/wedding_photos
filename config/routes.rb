Rails.application.routes.draw do
  root 'photos#index'

  post '/photos', to: 'zip#download', as: 'zip_download'
  get '/dl/:id', to: 'photos#download', as: 'download'

  resources :people
  resources :associations
end
