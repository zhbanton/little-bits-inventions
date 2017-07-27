# == Schema Information
#
# Table name: materials
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Material < ApplicationRecord

  validates :name, presence: true

  has_many :invention_materials
  has_many :inventions, through: :invention_materials

end
