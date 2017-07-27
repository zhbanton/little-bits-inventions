class CreateInventions < ActiveRecord::Migration[5.1]
  def change
    create_table :inventions do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.string :user_name
      t.string :email

      t.timestamps
    end
  end
end
