class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :rating, :heatIndex, :body, :created_at, :total_karma, :user, :user_id, :votes

  has_one :user
  has_many :votes
end
