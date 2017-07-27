# == Schema Information
#
# Table name: invention_bits
#
#  id           :integer          not null, primary key
#  bit_id       :integer
#  invention_id :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class InventionBit < ApplicationRecord
  belongs_to :bit
  belongs_to :invention
end
