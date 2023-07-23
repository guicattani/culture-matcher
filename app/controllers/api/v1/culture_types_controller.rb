# frozen_string_literal: true

module Api::V1
  class CultureTypesController < ActionController::Base
    skip_before_action :verify_authenticity_token

    def index
      render json: CultureType.all.to_json, status: :ok
    end

    def create
      @culture_type = CultureType.new(culture_type_params)

      if @culture_type.save
        render json: @culture_type.to_json, status: :created
      else
        render json: { errors: @culture_type.errors }, status: :unprocessable_entity
      end
    end

    private

    def culture_type_params
      params.permit(:name)
    end
  end
end
