require "rails_helper" 

RSpec.describe Api::V1::SaucesController, type: :controller do
  describe "GET#show" do 
    it "should return a sauce object" do 
      ketchup = FactoryBot.create(:sauce)

      get :show, params: {id: ketchup.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json['name']).to eq "Ketchup"
      expect(returned_json['brand']).to eq "Heinz"
      expect(returned_json['image_url']).to eq "https://m.media-amazon.com/images/I/71szc59Y0aL._SL1500_.jpg"
      expect(returned_json['description']).to eq "a tasty, tomato based sauce"
    end 
  end 
end 