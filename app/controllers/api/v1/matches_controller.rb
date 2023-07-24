# frozen_string_literal: true

module Api::V1
  class MatchesController < ActionController::Base
    skip_before_action :verify_authenticity_token

    def index
      render json: Match.all.to_json(include: { company: { only: :name },
                                                applicant: { only: %i[first_name
                                                                      last_name] } }), status: :ok
    end

    def match
      render json: Match.match.to_json(
        include: { company: { only: :name },
                   applicant: { only: %i[first_name
                                         last_name] } }
      ), status: :created
    end
  end
end
