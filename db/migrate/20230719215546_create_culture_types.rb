# frozen_string_literal: true

class CreateCultureTypes < ActiveRecord::Migration[7.0]
  def change
    create_table :culture_types do |t|
      t.string :name, null: false, index: { unique: true, name: 'unique_indexed_names' }

      t.timestamps
      
    end

    reversible do |direction|
      direction.up do
        execute <<-SQL
         INSERT INTO culture_types VALUES (1, 'undefined', NOW(), NOW());
        SQL
      end
    end
  end
end
