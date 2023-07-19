# frozen_string_literal: true

class CreateApplicants < ActiveRecord::Migration[7.0]
  def change
    create_table :applicants do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.references :culture_type, null: false, foreign_key: true

      t.timestamps
    end
  end
end
