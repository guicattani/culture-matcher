Rails.application.routes.draw do
  root to: 'company_matcher#index', as: :company_matcher

  namespace :api do
    namespace :v1 do
      resources :applicants, only: [:index, :create]
      resources :culture_types, only: [:index, :create]
      resources :companies, only: [:index, :create]
      resources :matches, only: [:index]
      match 'matches/match'       => "matches#match",       :via => :post
    end
  end

end