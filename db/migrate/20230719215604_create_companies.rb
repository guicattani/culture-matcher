# frozen_string_literal: true

class CreateCompanies < ActiveRecord::Migration[7.0]
  def change
    create_table :companies do |t|
      t.string :name, null: false
      t.references :culture_type, null: false, foreign_key: true

      t.timestamps
    end
  end
end
