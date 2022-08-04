class Api::V1::SaucesController < ApiController
  def show
    render json: Sauce.find(params[:id]), serializer: SauceShowSerializer
  end 
end 