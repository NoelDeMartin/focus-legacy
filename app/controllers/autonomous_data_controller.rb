class AutonomousDataController < ApplicationController
  skip_before_action :authenticate!
  skip_before_action :verify_authenticity_token

  def callback
    server = Admp::Server::find_by(state: params.require(:state))
    if server
      # TODO add schema information name
      server.update!(
        client_id: params.require(:client_id),
        client_secret: params.require(:client_secret),
      )
      head :ok
    else
      render json: {error: 'Invalid state'}, status: 400
    end
  end

  def redirect
    # TODO request auth credentials instead (this may return after app registration, authentication still pending)
    server = Admp::Server::find_by(state: params.require(:state))
    if server
      server.unset :state

      session[:auth] = server.id.to_str

      redirect_to root_path
    else
      render json: {error: 'Invalid state'}, status: 400
    end
  end
end
