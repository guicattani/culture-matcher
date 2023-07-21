# frozen_string_literal: true

class MatchesController < ActionController::Base
  def create
    @match = Match.new(match_params)

    if @match.save
      render json: serialize(@match).serialized_json, status: :created
    else
      render json: { errors: @match.errors }, status: :unprocessable_entity
    end
  end

  private

  def match_params
    params.permit(:applicant_id, :company_id)
  end
end
