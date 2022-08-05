require "rails_helper"

RSpec.describe Api::V1::UsersController, type: :controller do
  describe "GET#show" do
    it "should show the profile info" do
      user = FactoryBot.create(:user)
  
      get :show, params: {id: user.id}
      returned_json = JSON.parse(response.body)
      returned_time = ActiveSupport::TimeZone["UTC"].parse(returned_json['created_at'])

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      
      expect(returned_json['dippr_handle']).to eq user.dippr_handle
      expect(returned_time.to_s).to eq user.created_at.to_s
      expect(returned_json['avatar']['url']).to eq user.avatar.url
      expect(returned_json['email']).to eq user.email
    end
  end
end