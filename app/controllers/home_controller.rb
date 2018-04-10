class HomeController < ApplicationController
  def index
    render plain: 'home'
  end
end
