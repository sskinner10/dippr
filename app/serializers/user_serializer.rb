class UserSerializer < ActiveModel::Serializer
  attributes :id, :avatar, :dippr_handle, :created_at, :reviews

  has_many :reviews
end
