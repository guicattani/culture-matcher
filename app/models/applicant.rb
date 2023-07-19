# frozen_string_literal: true

class Applicant < ApplicationRecord
  validates_presence_of :first_name, :last_name
  belongs_to :culture_type
end
