class Api::V1::ReviewsController < ApiController
  protect_from_forgery unless: -> {request.format.json? }
  before_action :authenticate_user
  before_action :authorize_user, except: [:create]
  
  def create
    review = Review.new(review_params)
    review.sauce_id = params[:sauce_id]
    review.user_id = current_user[:id]

    if review.save
      votes = review.votes
      payload = {**review.attributes, votes: votes}
      render json: {review: payload}
    else 
      render json: {error: review.errors.full_messages, status: :unprocessable_entity }
    end
  end

  def destroy
    review = Review.find(params[:id])

    destroy_review(review)
  end

  private 

  def authenticate_user
    if !user_signed_in?
      render json: {error: ["you must be signed in"]}
    end
  end

  def authorize_user
    if !user_signed_in? || !(current_user.id == Review.find(params['id']).user.id) && !(current_user.role == 'admin')
      render json: {error: ["Only admins have access to this feature"]}
    end
  end

  def review_params
    params.require(:review).permit(:title, :rating, :heatIndex, :body)
  end

  def destroy_review(review)
    if review.destroy
      render json: Sauce.find(params[:sauce_id])
    else
      render json: {error: "Unable to delete this review", status: :not_implemented}
    end
  end
end 