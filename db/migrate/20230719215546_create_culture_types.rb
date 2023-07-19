# frozen_string_literal: true

class CreateCultureTypes < ActiveRecord::Migration[7.0]
  def change
    create_table :culture_types do |t|
      t.string :name, null: false

      t.timestamps
    end
  end
end
