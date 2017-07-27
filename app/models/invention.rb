# == Schema Information
#
# Table name: inventions
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  description :text             not null
#  user_name   :string
#  email       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Invention < ApplicationRecord

  validates :title, :description, presence: true

  has_many :invention_bits
  has_many :bits, through: :invention_bits
  has_many :invention_materials
  has_many :materials, through: :invention_materials

end