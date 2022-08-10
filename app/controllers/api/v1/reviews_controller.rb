class Api::V1::ReviewsController < ApiController
  protect_from_forgery unless: -> {request.format.json? }
  before_action :authenticate_user!, except: [:show]

  def show 
    render json: review.all
  end

  def create
    review = Review.new(review_params)
    review.sauce_id = params[:sauce_id]
    review.user_id = current_user[:id]

    if review.save
      render json: {review: review}
    else 
      render json: {error: review.errors.full_messages, status: :unprocessable_entity }
    end
  end

  private 

  def review_params
    params.require(:review).permit(:title, :rating, :heatIndex, :body)
  end
end 