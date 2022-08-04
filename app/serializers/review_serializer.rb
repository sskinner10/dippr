class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :rating, :heatIndex, :description
end
