# frozen_string_literal: true

class Match < ApplicationRecord
  belongs_to :applicant
  belongs_to :company
end
