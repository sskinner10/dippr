class SaucesController < ApplicationController
  def index
    @sauces = Sauce.all
  end

  def new
    @sauce = Sauce.new
  end

  def create
    @sauce = Sauce.new(sauce_params)

    


  end


  private

  def sauce_params
    params.require(:sauce).permit[:name, :brand, :image_url, :description]
  end

end