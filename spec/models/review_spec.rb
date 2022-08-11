require "rails_helper"

RSpec.describe Review, type: :model do
  describe "#total_karma" do
    it "will return an integer of the total karma a review has based on votes" do
      sauce = FactoryBot.create(:sauce)
      user = FactoryBot.create(:user)
      review = FactoryBot.create(:review, sauce: sauce, user: user)  
      vote = FactoryBot.create(:vote, user: user, review: review)

      expect(review.total_karma).to eq(1)
      expect(review.total_karma).to_not eq(2)
    end
  end
end