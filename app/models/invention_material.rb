# == Schema Information
#
# Table name: invention_materials
#
#  id           :integer          not null, primary key
#  material_id  :integer
#  invention_id :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class InventionMaterial < ApplicationRecord
  validates :material_id, uniqueness: { scope: :invention_id }

  belongs_to :material
  belongs_to :invention

  accepts_nested_attributes_for :material

  def material_attributes=(attributes)
    material = Material.find_or_create_by(name: attributes[:name])
    self.material_id = material.id
  end

end
