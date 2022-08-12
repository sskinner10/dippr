class Sauce < ApplicationRecord
  validates :name, presence: true
  validates :brand, presence: true
  validates :image_url, presence: true, url: true
  validates :name, uniqueness: { scope: :brand }

  extend FriendlyId
  friendly_id :name_brand_slug, use: :slugged

  has_many :reviews

  def name_brand_slug
    [
      [:name, :brand]
    ]
  end
end