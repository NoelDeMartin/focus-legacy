class HomeController < ApplicationController
  def index
    render file: 'home'
  end
end
