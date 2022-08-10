require "rails_helper" 

RSpec.describe Api::V1::ReviewsController, type: :controller do
  context "Testing reviews controller" do 
    let(:user) { FactoryBot.create(:user) }
    let(:sauce) { FactoryBot.create(:sauce) }
    
    before (:each) do
      sign_in user
    end

    describe "POST#create" do   
      it "returns JSON of new review" do 
    
        post_json = {
          title: "Delicious sauce", 
          rating: 5,
          heatIndex: 0,
          body: "it's delicious."
        }

        post :create, params: { review: post_json, sauce_id: sauce.id }, format: :json
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

      it "Returns an error for invalid input" do

        post_json = {
          title: "",
          rating: "",
          heatIndex: ""
        }

        post :create, params: { review: post_json, sauce_id: sauce.id }, format: :json
        returned_json = JSON.parse(response.body)

        expect(response.content_type).to eq("application/json")
        expect(returned_json).to be_kind_of(Hash)
        expect(returned_json).to_not be_kind_of(Array)
        expect(returned_json['error']).to be_kind_of(Array)
        expect(returned_json['error'].include?("Title can't be blank")).to eq true 
        expect(returned_json['error'].include?("Rating is not a number")).to eq true 
        expect(returned_json['error'].include?("Heatindex is not a number")).to eq true 
            
      end
    end 

    describe "POST#destroy" do
      it "user is able to delete own review" do
        review = FactoryBot.create(:review, user: user, sauce: sauce)
        reviews_array = sauce.reviews

        post_json = {
          id: review.id,
          sauce_id: sauce.id
        }
        
        reviews_count = sauce.reviews.length 
        post :destroy, params: post_json, format: :json
        returned_json = JSON.parse(response.body)

        expect(response.content_type).to eq("application/json")
        expect(returned_json).to be_kind_of(Hash)
        expect(returned_json).to_not be_kind_of(Array)
        expect(returned_json['sauce']['reviews'].length).to eq(reviews_count - 1)
      end 
    end 
  end 
end 