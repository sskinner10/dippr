class Sauce < ApplicationRecord
  validates :name, presence: true
  validates :brand, presence: true
  validates :image_url, presence: true, url: true

  validates :name, uniqueness: { scope: :brand }
end