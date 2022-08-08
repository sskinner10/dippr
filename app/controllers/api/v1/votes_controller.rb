class Api::V1::VotesController < ApiController
	before_action :authenticate_user

  def create
		# binding.pry
  end

	private

	def authenticate_user
    if !user_signed_in?
      render json: {error: ["You need to be signed in first"]}
    end
  end
end