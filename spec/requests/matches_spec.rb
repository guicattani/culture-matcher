# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/matches' do
  let(:url) { '/api/v1/matches' }

  describe 'GET #index' do
    context 'when data is empty' do
      before { get url }

      it 'returns 200' do
        expect(response).to have_http_status :ok
      end
    end

    context 'with data' do
      let!(:culture_type) { create(:culture_type, id: 2) }
      let!(:applicant_one) { create(:applicant, culture_type:) }
      let!(:company_one) { create(:company, culture_type:) }
      let!(:match_one) { Match.create(applicant: applicant_one, company: company_one) }

      before { get url }

      it 'returns 200' do
        expect(response).to have_http_status :ok
      end

      it 'returns a json with matches' do
        expect(response.body).to be_present
        expect(response.body).to include(applicant_one.first_name)
        expect(response.body).to include(company_one.name)
      end
    end
  end

  describe 'POST #match/match' do
    let(:url) { '/api/v1/matches/match' }
    let!(:culture_type) { create(:culture_type, id: 2) }
    let!(:other_culture_type) { create(:culture_type, id: 3) }
    let!(:applicant_one) { create(:applicant, culture_type:) }
    let!(:company_one) { create(:company, culture_type:) }
    let!(:company_two) { create(:company, culture_type: other_culture_type) }
    let!(:company_three) { create(:company, culture_type:) }

    it 'matches applicants and companies with the same culture type' do
      expect { post url }.to change(Match, :count).by(2)

      expect(Match.find_by(company_id: company_two.id)).to be_nil
    end

    it 'returns 201' do
      post url
      expect(response).to have_http_status :created
    end
  end
end
