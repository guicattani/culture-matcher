# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Company do
  describe 'associations' do
    it { is_expected.to belong_to(:culture_type) }
  end
end
