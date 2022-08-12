class Api::V1::SaucesController < ApiController
  def show
    render json: Sauce.friendly.find(params[:id])
  end 
end 