# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_07_19_215701) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "applicants", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.bigint "culture_type_id", default: 1, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["culture_type_id"], name: "index_applicants_on_culture_type_id"
  end

  create_table "companies", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "culture_type_id", default: 1, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["culture_type_id"], name: "index_companies_on_culture_type_id"
  end

  create_table "culture_types", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "unique_indexed_names", unique: true
  end

  create_table "matches", force: :cascade do |t|
    t.bigint "applicant_id", null: false
    t.bigint "company_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["applicant_id", "company_id"], name: "index_matches_on_applicant_id_and_company_id", unique: true
    t.index ["applicant_id"], name: "index_matches_on_applicant_id"
    t.index ["company_id"], name: "index_matches_on_company_id"
  end

  add_foreign_key "applicants", "culture_types"
  add_foreign_key "companies", "culture_types"
  add_foreign_key "matches", "applicants"
  add_foreign_key "matches", "companies"
end
