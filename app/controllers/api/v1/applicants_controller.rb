# frozen_string_literal: true

module Api::V1
  class ApplicantsController < ActionController::Base
    skip_before_action :verify_authenticity_token

    def index
      render json: Applicant.all
                            .includes(:culture_type)
                            .to_json(include: { culture_type: { only: :name } }),
             status: :ok
    end

    def create
      @applicant = Applicant.new(applicant_params)

      if @applicant.save
        render json: @applicant.to_json(include: { culture_type: { only: :name } }),
               status: :created
      else
        render json: { errors: @applicant.errors }, status: :unprocessable_entity
      end
    end

    private

    def applicant_params
      params.permit(:first_name, :last_name, :culture_type_id)
    end
  end
end
