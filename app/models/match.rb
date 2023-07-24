# frozen_string_literal: true

class Match < ApplicationRecord
  belongs_to :applicant
  belongs_to :company

  def self.match
    new_matches = ActiveRecord::Base.connection.execute("
      SELECT applicants.id AS applicant_id, companies.id AS company_id
      FROM applicants
      INNER JOIN companies ON companies.culture_type_id = applicants.culture_type_id
      WHERE (applicants.id, companies.id) NOT IN (SELECT applicant_id, company_id FROM matches)
      AND applicants.culture_type_id != 1 AND companies.culture_type_id != 1
    ")
    matches = []
    errors = [] # unused but can report to a logger in the future
    new_matches.each do |new_match|
      match = Match.new(applicant_id: new_match['applicant_id'],
                        company_id: new_match['company_id'])
      if match.save
        matches << match if match.save
        next
      end
      errors << "error matching: applicant_id #{new_match['applicant_id']} " \
                "company_id #{new_match['company_id']}: #{match.errors.message}"
    end
    matches
  end
end
