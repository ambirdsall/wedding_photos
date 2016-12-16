Rails.application.routes.draw do
  root 'photos#index'

  post '/photos', to: 'zip#photos', as: 'download'

  resources :people
  resources :photos, only: [:index, :show]
end
