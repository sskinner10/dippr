class SaucesController < ApplicationController
  before_action :authenticate_user!, except: [:index]
  before_action :authorize_user, except: [:index, :new, :create]

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

  def edit
    @sauce = Sauce.friendly.find(params[:id])
  end

  def update
    @sauce = Sauce.friendly.find(params[:id])

    if @sauce.update(sauce_params)
      flash[:notice] = "Sauce updated successfully"
      redirect_to sauces_path
    else
      flash.now[:error] = @sauce.errors.full_messages.to_sentence
      render :edit
    end
  end

  def destroy
    @sauce = Sauce.friendly.find(params[:id])

    if @sauce.destroy
      flash[:notice] = "Sauce obliterated. The sauce is lost."
      redirect_to sauces_path
    else
      flash.now[:error] = "Unable to delete sauce"
      render :edit
    end

  end

  private

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      raise ActionController::RoutingError.new("Not Found")
    end
  end

  def sauce_params
    params.require(:sauce).permit(:name, :brand, :image_url, :description)
  end
end