class Invention < ApplicationRecord

  validates :title, :description, presence: true

  has_many :invention_bits
  has_many :bits, through: :invention_bits
  has_many :invention_materials
  has_many :materials, through: :invention_materials

end
