# frozen_string_literal: true

class CultureType < ApplicationRecord
  validates_presence_of :name
end
