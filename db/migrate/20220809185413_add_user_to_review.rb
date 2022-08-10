class AddUserToReview < ActiveRecord::Migration[5.2]
  def change
    add_reference :reviews, :user, presence: true, default: 1
  end
end
