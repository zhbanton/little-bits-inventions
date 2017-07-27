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
  belongs_to :material
  belongs_to :invention
end
