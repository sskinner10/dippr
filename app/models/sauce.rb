class Sauce < ApplicationRecord
  validates :name, presence: true
  validates :brand, presence: true
  validates :image_url, presence: true, url: true
  validates :name, uniqueness: { scope: :brand }

  has_many :reviews

  def average_rating_text
    if self.reviews.length == 0
      return "No Reviews Yet"
    else
      avg = ((self.reviews.sum(:rating).to_f) / self.reviews.length).round(1)
      return "Average rating: #{avg} / 5.0"
    end
  end
end