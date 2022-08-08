class VoteSerializer < ActiveModel::Serializer
  attributes :id, :vote_type, :user_id
end
