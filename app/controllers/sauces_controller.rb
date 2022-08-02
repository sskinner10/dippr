class SaucesController < ApplicationController
  def index
    @sauces = Sauce.all
  end
end