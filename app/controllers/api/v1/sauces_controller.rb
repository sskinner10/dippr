class Api::V1::SaucesController < ApiController
  def show    
    render json: Sauce.find(params[:id]), include: "reviews,reviews.votes"
  end 
end 