Rails.application.routes.draw do
  root to: 'company_matcher#index', as: :company_matcher

  match 'applicants/'    => "applicants#create",    :via => :post
  match 'companies/'     => "companies#create",     :via => :post
  match 'culture_types/' => "culture_types#create", :via => :post
  match 'matches/'       => "matches#create",       :via => :post
end
