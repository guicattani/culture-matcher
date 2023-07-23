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
      new_matches = ActiveRecord::Base.connection.execute("
        SELECT applicants.id AS applicant_id, companies.id AS company_id
        FROM applicants
        INNER JOIN companies ON companies.culture_type_id = applicants.culture_type_id
        WHERE (applicants.id, companies.id) NOT IN (SELECT applicant_id, company_id FROM matches)
        AND applicants.culture_type_id != 1
        AND companies.culture_type_id != 1
      ")

      errors = []
      matches = []
      new_matches.each do |new_match|
        match = Match.new(applicant_id: new_match['applicant_id'],
                          company_id: new_match['company_id'])
        if match.save
          matches << match if match.save
          next
        end

        errors << "error matching: applicant_id #{new_match['applicant_id']} " \
                  "company_id #{new_match['company_id']}: " \
                  "#{match.errors.message}"
      end

      pp "errors in matches: #{errors}" # put logger here as soon as logic is done

      render json: matches.to_json(
        include: { company: { only: :name },
                   applicant: { only: %i[first_name
                                         last_name] } }
      ), status: :created
    end
  end
end
