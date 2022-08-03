class SaucesController < ApplicationController
  def index
    @sauces = Sauce.all
  end

  def new
    @sauce = Sauce.new
  end

  def create
    @sauce = Sauce.new(sauce_params)

    if @sauce.save
      flash[:notice] = "You successfully added that sauce."
      redirect_to sauces_path
    else
      flash.now[:error] = @sauce.errors.full_messages.to_sentence 
      render :new
    end
  end

  private

  def sauce_params
    params.require(:sauce).permit(:name, :brand, :image_url, :description)
  end
end