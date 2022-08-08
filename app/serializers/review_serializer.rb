class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :rating, :heatIndex, :body, :created_at, :total_karma

  has_many :votes
end
