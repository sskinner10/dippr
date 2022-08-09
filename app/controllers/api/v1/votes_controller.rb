class Api::V1::VotesController < ApiController
	before_action :authenticate_user

  def create
		existing_vote = Vote.where(user_id: current_user.id, review_id: params['review_id']).first

    if existing_vote
      review = Review.find(params['review_id'])

      if existing_vote.vote_type === params['vote_type']
        existing_vote.destroy

        karma = review.total_karma
        vote = { vote_type: nil }
        payload = { vote: vote, karma: karma }

        render json: payload
      else
        existing_vote.update(vote_type: params['vote_type'])

        karma = review.total_karma
        payload = { vote: existing_vote, karma: karma}

        render json: payload
      end

    else
      vote_hash = vote_params.merge!({user_id: current_user.id})
      vote = Vote.new(vote_hash)

      if vote.save
        review = Review.find(vote.review_id)
        karma = review.total_karma
        payload = { vote: vote, karma: karma }

        render json: payload
      else
        render json: {error: "An error occurred."}
      end
    end
  end

	private

	def authenticate_user
    if !user_signed_in?
      render json: {error: ["You must be signed in to vote on reviews!"]}
    end
  end

  def vote_params
    params.require(:vote).permit(:vote_type, :review_id)
  end
end