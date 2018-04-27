class HomeController < ApplicationController
  def index
    render file: 'app'
  end
end
