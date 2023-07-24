# frozen_string_literal: true

FactoryBot.define do
  factory :culture_type do
    name { Faker::Adjective.positive }
  end
end
