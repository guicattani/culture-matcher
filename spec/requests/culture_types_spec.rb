# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/culture_types' do
  let(:url) { '/api/v1/culture_types' }

  describe 'GET #index' do
    context 'when data is empty' do
      before { get url }

      it 'returns 200' do
        expect(response).to have_http_status :ok
      end
    end

    context 'with data' do
      let!(:culture_type) { create(:culture_type, id: 2) }

      before { get url }

      it 'returns 200' do
        expect(response).to have_http_status :ok
      end

      it 'returns a json with culture_types' do
        expect(response.body).to be_present
        expect(response.body).to include(culture_type.name)
      end
    end
  end

  describe 'POST #create' do
    context 'when valid params' do
      let(:params) do
        attributes_for(:culture_type)
      end

      it 'returns 201' do
        expect { post url, params: }.to change(CultureType, :count).by(1)

        expect(response).to have_http_status :created
      end
    end

    context 'when invalid params' do
      let(:params) do
        {}
      end

      it 'returns 422' do
        expect { post url, params: }.not_to change(CultureType, :count)

        expect(response).to have_http_status :unprocessable_entity
      end
    end
  end
end
