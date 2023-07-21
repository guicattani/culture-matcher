# frozen_string_literal: true

class ApplicantsController < ActionController::Base
  def create
    @applicant = Applicant.new(applicant_params)

    if @applicant.save
      render json: serialize(@applicant).serialized_json, status: :created
    else
      render json: { errors: @applicant.errors }, status: :unprocessable_entity
    end
  end

  private

  def applicant_params
    params.permit(:first_name, :last_name, :culture_type_id)
  end
end
