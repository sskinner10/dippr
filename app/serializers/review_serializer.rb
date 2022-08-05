class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :rating, :heatIndex, :body, :created_at
end
