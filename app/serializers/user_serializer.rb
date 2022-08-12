class UserSerializer < ActiveModel::Serializer
  attributes :id, :current_user, :avatar, :dippr_handle, :created_at, :reviews

  has_many :reviews
end
