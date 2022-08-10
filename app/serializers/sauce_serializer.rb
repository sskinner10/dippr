class SauceSerializer < ActiveModel::Serializer
  attributes :id, :image_url, :brand, :name, :description, :current_user
  
  has_many :reviews
end
