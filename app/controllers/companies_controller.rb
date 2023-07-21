# frozen_string_literal: true

class CompaniesController < ActionController::Base
  def create
    @company = Company.new(company_params)

    if @company.save
      render json: serialize(@company).serialized_json, status: :created
    else
      render json: { errors: @company.errors }, status: :unprocessable_entity
    end
  end

  private

  def company_params
    params.permit(:name, :culture_type_id)
  end
end
