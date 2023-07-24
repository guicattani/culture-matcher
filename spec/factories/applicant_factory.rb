# frozen_string_literal: true

FactoryBot.define do
  factory :applicant do
    first_name { Faker::Name.neutral_first_name }
    last_name { Faker::Name.last_name }
  end
end
