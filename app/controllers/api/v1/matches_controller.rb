# frozen_string_literal: true

module Api::V1
  class MatchesController < ActionController::Base
    skip_before_action :verify_authenticity_token

    def index
      render json: Match.all.to_json, status: :ok
    end

    def create
      @match = Match.new(match_params)

      if @match.save
        render json: @match.to_json, status: :created
      else
        render json: { errors: @match.errors }, status: :unprocessable_entity
      end
    end

    def match
      new_matches = ActiveRecord::Base.connection.execute("
        SELECT applicants.id AS applicant_id, companies.id AS company_id
        FROM applicants
        INNER JOIN companies ON companies.culture_type_id = applicants.culture_type_id
        WHERE (applicants.id, companies.id) NOT IN (SELECT applicant_id, company_id FROM matches)
        AND applicants.culture_type_id != 1
        AND companies.culture_type_id != 1
      ")

      errors = []
      new_matches.each do |new_match|
        match = Match.new(applicant_id: new_match['applicant_id'],
                          company_id: new_match['company_id'])
        next if match.save

        errors << "error matching: applicant_id #{new_match['applicant_id']} " \
                  "company_id #{new_match['company_id']}: " \
                  "#{match.errors.message}"
      end

      render json: errors.to_json, status: :created
    end

    private

    def match_params
      params.permit(:applicant_id, :company_id)
    end
  end
end
