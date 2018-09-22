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
        session[:auth] = server.id.to_str

        return redirect_to root_path

        # TODO request auth
        # return redirect_to server.url + '/authorize' + \
        #   '?callback_uri=' + Rack::Utils.escape(admp_authorized_url) + \
        #   '&state=' + Rack::Utils.escape(server.state) + \
        #   '&scope=' + scope + \
        #   '&response_type=code' + \
        #   '&client_id=' + server.client_id + \
        #   '&client_secret=' + server.client_secret
      end
    end

    redirect_to server.url + '/register' + \
      '?callback_url=' + Rack::Utils.escape(callback_url) + \
      '&redirect_url=' + Rack::Utils.escape(redirect_url) + \
      '&name=' + Rack::Utils.escape('Focus') + \
      '&description=' + Rack::Utils.escape('Task Manager') + \
      '&state=' + Rack::Utils.escape(server.state) + \
      '&domain=' + Rack::Utils.escape(URI.parse(root_url).host) + \
      '&schema_url=' + Rack::Utils.escape(root_url + '/schema.graphql')
  end

  def logout
    session.delete :admp_server_url
    session.delete :admp_tasks_collection
    session.delete :admp_access_token
    redirect_to root_path
  end
end
