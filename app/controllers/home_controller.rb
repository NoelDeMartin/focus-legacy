class HomeController < ApplicationController
  def index
    render plain: 'user logged in with access token: ' + session[:admp_access_token]
  end
end
