class Api::V1::SaucesController < ApiController
  def show
    sauce_show_obj = Sauce.find(params[:id]), serialize: SauceShowSerializer
    
    render json: sauce_show_obj
  end 
end 