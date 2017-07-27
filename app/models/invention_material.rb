class InventionMaterial < ApplicationRecord
  belongs_to :material
  belongs_to :invention
end
