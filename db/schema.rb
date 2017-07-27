# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170727170254) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bits", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "invention_bits", force: :cascade do |t|
    t.bigint "bit_id"
    t.bigint "invention_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bit_id"], name: "index_invention_bits_on_bit_id"
    t.index ["invention_id"], name: "index_invention_bits_on_invention_id"
  end

  create_table "invention_materials", force: :cascade do |t|
    t.bigint "material_id"
    t.bigint "invention_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["invention_id"], name: "index_invention_materials_on_invention_id"
    t.index ["material_id"], name: "index_invention_materials_on_material_id"
  end

  create_table "inventions", force: :cascade do |t|
    t.string "title", null: false
    t.text "description", null: false
    t.string "user_name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "materials", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "invention_bits", "bits"
  add_foreign_key "invention_bits", "inventions"
  add_foreign_key "invention_materials", "inventions"
  add_foreign_key "invention_materials", "materials"
end
