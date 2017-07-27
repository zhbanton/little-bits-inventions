# == Schema Information
#
# Table name: bits
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Bit < ApplicationRecord

  validates :name, presence: true

  has_many :invention_bits
  has_many :inventions, through: :invention_bits

end
