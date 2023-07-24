# frozen_string_literal: true

##
# Company represents the model for a company
class Company < ApplicationRecord
  belongs_to :culture_type
end
