# frozen_string_literal: true

##
# Applicant represents the model for an applicant
class Applicant < ApplicationRecord
  validates_presence_of :first_name, :last_name
  belongs_to :culture_type
end
