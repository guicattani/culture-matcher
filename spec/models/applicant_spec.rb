# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Applicant do
  describe 'validations' do
    it { is_expected.to validate_presence_of(:first_name) }
    it { is_expected.to validate_presence_of(:last_name) }
  end

  describe 'associations' do
    it { is_expected.to belong_to(:culture_type) }
  end
end
