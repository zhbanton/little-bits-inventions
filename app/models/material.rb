class Material < ApplicationRecord

  validates :name, presence: true

  has_many :invention_materials
  has_many :inventions, through: :invention_materials

end
