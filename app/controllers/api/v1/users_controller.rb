class Api::V1::UsersController < ApiController
  def show
    render json: User.friendly.find(params[:id])
  end
end