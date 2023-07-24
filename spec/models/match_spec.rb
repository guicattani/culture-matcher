# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Match do
  describe 'associations' do
    it { is_expected.to belong_to(:applicant) }
    it { is_expected.to belong_to(:company) }
  end

  describe '#match' do
    let!(:culture_type) { create(:culture_type, id: 2) }
    let!(:other_culture_type) { create(:culture_type, id: 3) }
    let!(:applicant_one) { create(:applicant, culture_type:) }
    let!(:company_one) { create(:company, culture_type:) }
    let!(:company_two) { create(:company, culture_type: other_culture_type) }
    let!(:company_three) { create(:company, culture_type:) }

    it 'matches applicants and companies with the same culture type' do
      expect { described_class.match }.to change(described_class, :count).by(2)

      expect(described_class.find_by(company_id: company_two.id)).to be_nil
    end
  end
end
