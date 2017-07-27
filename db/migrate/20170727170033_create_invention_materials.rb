class CreateInventionMaterials < ActiveRecord::Migration[5.1]
  def change
    create_table :invention_materials do |t|
      t.references :material, foreign_key: true
      t.references :invention, foreign_key: true

      t.timestamps
    end
  end
end
