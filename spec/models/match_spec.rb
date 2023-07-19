# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Match do
  describe 'associations' do
    it { is_expected.to belong_to(:applicant) }
    it { is_expected.to belong_to(:company) }
  end
end
