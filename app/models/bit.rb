class Bit < ApplicationRecord

  validates :name, presence: true

  has_many :invention_bits
  has_many :inventions, through: :invention_bits

end
