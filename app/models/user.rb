class User < ApplicationRecord
  mount_uploader :avatar, AvatarUploader
  # has_many :sauces

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  validates :dippr_handle, presence: true, uniqueness: true
  validates :avatar, presence: true
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
