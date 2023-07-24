# frozen_string_literal: true

##
# CultureType represents the model for a culture_type
class CultureType < ApplicationRecord
  validates_presence_of :name
end
