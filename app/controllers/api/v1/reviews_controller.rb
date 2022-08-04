class Api::V1::ReviewsController < ApiController
  def show 
    render json: Review.find(params[:id])
  end 
end 