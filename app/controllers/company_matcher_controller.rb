# frozen_string_literal: true

class CompanyMatcherController < ApplicationController
  def index
    @applicants = Applicant.all
    @companies = Company.all
    @culture_types = CultureType.all
    @matches = Match.all
  end
end
