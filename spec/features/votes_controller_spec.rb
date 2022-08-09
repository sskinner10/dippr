require "rails_helper"

RSpec.describe Api::V1::VotesController, type: :controller do
  describe "POST#create" do
    before (:each) do  
      sign_in user
    end

    let(:user) { FactoryBot.create(:user) }
    let(:sauce) { FactoryBot.create(:sauce) }
    let(:review) { FactoryBot.create(:review, sauce: sauce) }

    it "adds a new vote to a review" do
      post_json = {
        vote: {
          review_id: review.id,
          vote_type: 1
        }
      }
  
      prev_count = Vote.count
      post :create, params: post_json, format: :json
      expect(Vote.count).to eq(prev_count + 1)
    end

    it "returns the json of the new vote" do
      post_json = {
        vote: {
          review_id: review.id,
          vote_type: 1
        }
      }
    
      prev_count = Vote.count
      post :create, params: post_json, format: :json
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      new_karma = review.total_karma
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json['vote']['vote_type']).to eq(1)
      expect(returned_json['karma']).to eq(new_karma)
    end
  end
end