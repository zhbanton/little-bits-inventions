class AddCharacterLimitsToInventionFields < ActiveRecord::Migration[5.1]
  def up
    change_column :inventions, :title, :string, limit: 255
    change_column :inventions, :user_name, :string, limit: 255
    change_column :inventions, :email, :string, limit: 255
  end

  def down
    change_column :inventions, :title, :string
    change_column :inventions, :user_name, :string
    change_column :inventions, :email, :string
  end
end
