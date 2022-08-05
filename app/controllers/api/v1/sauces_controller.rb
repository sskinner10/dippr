class Api::V1::SaucesController < ApiController
  def show    
    render json: Sauce.find(params[:id])
  end 
end 