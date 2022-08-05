class SauceShowSerializer < ActiveModel::Serializer
  attributes :id, :image_url, :brand, :name, :description

  has_many :reviews
end
