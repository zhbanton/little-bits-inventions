# == Schema Information
#
# Table name: inventions
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  description :text             not null
#  user_name   :string(255)
#  email       :string(255)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Invention < ApplicationRecord

  validates :title, :description, :invention_bits, presence: true
  validates :title, :user_name, :email, length: { maximum: 255 }

  has_many :invention_bits, dependent: :destroy
  has_many :bits, through: :invention_bits
  has_many :invention_materials, dependent: :destroy
  has_many :materials, through: :invention_materials

  accepts_nested_attributes_for :invention_bits
  accepts_nested_attributes_for :invention_materials, reject_if: :invalid?

end
