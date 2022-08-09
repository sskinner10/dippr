class Review < ApplicationRecord
  validates :title, presence: true
  validates :rating, numericality: { minimum: 0, maximum: 5 }
  validates :heatIndex, numericality: { minimum: 0, maximum: 10 }
  
  belongs_to :sauce

  has_many :votes
  has_many :users, through: :votes

  def total_karma
    self.votes.sum(:vote_type)
  end
end