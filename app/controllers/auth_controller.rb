class AuthController < ApplicationController
  skip_before_action :authenticate!

  def show
    session[:admp_state] = (0...25).map { ('a'..'z').to_a[rand(26)] }.join
    render 'auth/login'
  end

  def login

    url = params.require(:url)
    service = Admp::Service::find_by(root_uri: url)

    if service.nil?
      service = Admp::Service::create!(
        root_uri: url,
        state: session[:admp_state]
      )
    else
      # TODO if already registered, redirect to auth instead
      # TODO if not registered, handle pending registration
    end

    # TODO handle edge cases with state being different in session and service

    redirect_to url + \
      '?callback_uri=' + Rack::Utils.escape(admp_registered_url) + \
      '&name=' + Rack::Utils.escape('Focus -- Task Manager') + \
      '&state=' + Rack::Utils.escape(service.state) + \
      '&auth[scope]=todo' + \
      '&auth[response_type]=code'
  end
end
