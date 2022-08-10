class Vote < ApplicationRecord
  validates :vote_type, numericality: { only_integer: true, greater_than_or_equal_to: -1, less_than_or_equal_to: 1, other_than: 0 }

  belongs_to :user
  belongs_to :review
end