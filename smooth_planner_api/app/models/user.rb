class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true
  has_and_belongs_to_many :trips
end
