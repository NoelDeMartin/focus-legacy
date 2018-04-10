class AuthController < ApplicationController
  skip_before_action :authenticate!

  def show
    session[:admp_state] = (0...25).map { ('a'..'z').to_a[rand(26)] }.join
    render 'auth/login'
  end

  def login
    redirect_to params.require(:url) + \
      '?callback_uri=' + Rack::Utils.escape(admp_registered_url) + \
      '&name=' + Rack::Utils.escape('Focus -- Task Manager') + \
      '&state=' + Rack::Utils.escape(session[:admp_state]) + \
      '&auth[scope]=todo' + \
      '&auth[response_type]=code'
  end
end
