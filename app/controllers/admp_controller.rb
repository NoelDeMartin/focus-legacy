class AdmpController < ApplicationController
  skip_before_action :authenticate!

  def registered
    service = Admp::Service::find_by(state: params.require(:state))
    if service
      service.update!(
        client_id: params.require(:client_id),
        client_secret: params.require(:client_secret),
      )
      render json: {redirect_uri: admp_authorized_url}
    else
      render json: {error: 'Invalid state'}
    end
  end

  def authorized
    service = Admp::Service::find_by(state: params.require(:state))

    if service && service.state == session[:admp_state]

      # TODO Retrieve access_token using code request
      access_token = 'access_token'

      # TODO remove state from service
      session.delete :admp_state

      session[:admp_access_token] = access_token

      redirect_to root_path
    else
      # TODO implement error view
      render plain: 'State argument is invalid for this session'
    end
  end
end