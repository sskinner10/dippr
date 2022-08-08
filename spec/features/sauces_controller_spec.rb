require "rails_helper" 

RSpec.describe Api::V1::SaucesController, type: :controller do
  describe "GET#show" do 
    it "should return a sauce object" do 
      ketchup = FactoryBot.create(:sauce)
      review = FactoryBot.create(:review, sauce: ketchup)

      get :show, params: {id: ketchup.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json['sauce']['name']).to eq "Ketchup"
      expect(returned_json['sauce']['brand']).to eq "Heinz"
      expect(returned_json['sauce']['image_url']).to eq "https://m.media-amazon.com/images/I/71szc59Y0aL._SL1500_.jpg"
      expect(returned_json['sauce']['description']).to eq "a tasty, tomato based sauce"

      expect(returned_json['sauce']['reviews'][0]['title']).to eq "Delicious sauce"
      expect(returned_json['sauce']['reviews'][0]['rating']).to eq 5
      expect(returned_json['sauce']['reviews'][0]['heatIndex']).to eq 0
      expect(returned_json['sauce']['reviews'][0]['body']).to eq "it's delicious."
    end 
  end 
end 