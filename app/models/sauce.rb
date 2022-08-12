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

  def average_rating_text
    if self.reviews.length == 0
      return "No Reviews Yet"
    else
      avg = ((self.reviews.sum(:rating).to_f) / self.reviews.length).round(1)
      return "Average rating: #{avg} / 5.0"
    end
  end
end