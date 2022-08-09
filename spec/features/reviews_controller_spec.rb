require "rails_helper" 

RSpec.describe Api::V1::ReviewsController, type: :controller do

  describe "POST#create" do 
    
    it "returns JSON of new review" do 
      ketchup = FactoryBot.create(:sauce)
      user = FactoryBot.create(:user)
      review = FactoryBot.create(:review, sauce: ketchup, user: user)

      sign_in user

      post_json = {
        title: review.title, 
        rating: review.rating,
        heatIndex: review.heatIndex,
        body: review.body
      }

      post :create, params: { review: post_json, sauce_id: ketchup.id }, format: :json
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json['review']['title']).to eq "Delicious sauce"
      expect(returned_json['review']['rating']).to eq 5
      expect(returned_json['review']['heatIndex']).to eq 0
      expect(returned_json['review']['body']).to eq "it's delicious."
    end 
  end 
end 