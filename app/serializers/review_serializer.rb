class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :rating, :heatIndex, :body, :created_at

  belongs_to :sauce
end
