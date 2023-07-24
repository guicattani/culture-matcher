# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/companies' do
  let(:url) { '/api/v1/companies' }

  describe 'GET #index' do
    context 'when data is empty' do
      before { get url }

      it 'returns 200' do
        expect(response).to have_http_status :ok
      end
    end

    context 'with data' do
      let!(:culture_type) { create(:culture_type, id: 2) }
      let!(:company_one) { create(:company, culture_type:) }

      before { get url }

      it 'returns 200' do
        expect(response).to have_http_status :ok
      end

      it 'returns a json with companies and their culture type' do
        expect(response.body).to be_present
        expect(response.body).to include(company_one.name)
        expect(response.body).to include(culture_type.name)
      end
    end
  end

  describe 'POST #create' do
    let!(:culture_type) { create(:culture_type, id: 2) }

    context 'when valid params' do
      let(:params) do
        attributes_for(:company).merge({ culture_type_id: culture_type.id })
      end

      it 'returns 201' do
        expect { post url, params: }.to change(Company, :count).by(1)

        expect(response).to have_http_status :created
      end
    end

    context 'when invalid params' do
      let(:params) do
        attributes_for(:company)
      end

      it 'returns 422' do
        expect { post url, params: }.not_to change(Company, :count)

        expect(response).to have_http_status :unprocessable_entity
      end
    end
  end
end
