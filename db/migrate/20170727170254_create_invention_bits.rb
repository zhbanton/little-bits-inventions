class CreateInventionBits < ActiveRecord::Migration[5.1]
  def change
    create_table :invention_bits do |t|
      t.references :bit, foreign_key: true
      t.references :invention, foreign_key: true

      t.timestamps
    end
  end
end
