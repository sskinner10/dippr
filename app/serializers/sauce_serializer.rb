class SauceSerializer < ActiveModel::Serializer
  attributes :id, :sauce_image, :brand, :name, :description, :current_user
  
  has_many :reviews
end
