class Api::V1::SaucesController < ApiController
    def show 
        render json: { sauce: Sauce.find(params[:id]) }
    end 
end 