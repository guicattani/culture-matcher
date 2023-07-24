# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/applicants' do
  let(:url) { '/api/v1/applicants' }

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

      before { get url }

      it 'returns 200' do
        expect(response).to have_http_status :ok
      end

      it 'returns a json with applicants and their culture type' do
        expect(response.body).to be_present
        expect(response.body).to include(applicant_one.first_name)
        expect(response.body).to include(culture_type.name)
      end
    end
  end

  describe 'POST #create' do
    let!(:culture_type) { create(:culture_type, id: 2) }

    context 'when valid params' do
      let(:params) do
        attributes_for(:applicant).merge({ culture_type_id: culture_type.id })
      end

      it 'returns 201' do
        expect { post url, params: }.to change(Applicant, :count).by(1)

        expect(response).to have_http_status :created
      end
    end

    context 'when invalid params' do
      let(:params) do
        attributes_for(:applicant)
      end

      it 'returns 422' do
        expect { post url, params: }.not_to change(Applicant, :count)

        expect(response).to have_http_status :unprocessable_entity
      end
    end
  end
end
