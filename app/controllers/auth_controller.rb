class AuthController < ApplicationController
  skip_before_action :authenticate!

  def show
    session[:admp_state] = (0...25).map { ('a'..'z').to_a[rand(26)] }.join
    render 'auth/login'
  end

  def login
    url = params.require(:url)
    server = Admp::Server::find_by(url: url)
    scope = 'todo'

    if server.nil?
      server = Admp::Server::create!(
        url: url,
        state: session[:admp_state]
      )
    else
      server.update!(state: session[:admp_state])
      if server.registered?
        return redirect_to server.url + '/auth' + \
          '?callback_uri=' + Rack::Utils.escape(admp_authorized_url) + \
          '&state=' + Rack::Utils.escape(server.state) + \
          '&scope=' + scope + \
          '&response_type=code' + \
          '&client_id=' + server.client_id + \
          '&client_secret=' + server.client_secret
      end
    end

    redirect_to server.url + '/register' + \
      '?callback_uri=' + Rack::Utils.escape(admp_registered_url) + \
      '&name=' + Rack::Utils.escape('Focus -- Task Manager') + \
      '&state=' + Rack::Utils.escape(server.state) + \
      '&auth[scope]=' + scope + \
      '&auth[response_type]=code'
  end

  def logout
    session.delete :admp_access_token
    redirect_to root_path
  end
end
