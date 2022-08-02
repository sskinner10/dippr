class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  validates :dippr_handle, presence: true, uniqueness: true
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
