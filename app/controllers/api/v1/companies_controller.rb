# frozen_string_literal: true

module Api::V1
  class CompaniesController < ActionController::Base
    skip_before_action :verify_authenticity_token

    # GET /api/v1/company
    def index
      render json: Company.all
                          .includes(:culture_type)
                          .to_json(include: { culture_type: { only: :name } }),
             status: :ok
    end

    # POST /api/v1/company
    def create
      @company = Company.new(company_params)

      if @company.save
        render json: @company.to_json(include: { culture_type: { only: :name } }), status: :created
      else
        render json: { errors: @company.errors }, status: :unprocessable_entity
      end
    end

    private

    def company_params
      params.permit(:name, :culture_type_id)
    end
  end
end
