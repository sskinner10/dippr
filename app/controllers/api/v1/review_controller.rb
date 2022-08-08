class Api::ReviewsController < ApiController
  protect_from_forgery unless: -> {request.format.json? }

  def show 
    render json: { review.all }
  end

  def create 
    review = Review.new(text: params[:review])
    if review.save
      render json: { review: review}
    else 
      render json: {error: review.errors.full_messages }, status: :unprocessable
    end 
  end 
end 

