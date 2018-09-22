require 'net/http'

class AdmpController < ApplicationController
  skip_before_action :authenticate!

  def registered
    server = Admp::Server::find_by(state: params.require(:state))
    if server
      # TODO add collection name
      server.update!(
        client_id: params.require(:client_id),
        client_secret: params.require(:client_secret),
        tasks_collection: params.require(:collections)[0],
      )
      render json: {redirect_uri: admp_authorized_url}
    else
      render json: {error: 'Invalid state'}
    end
  end

  def authorized
    server = Admp::Server::find_by(state: params.require(:state))

    if not server.nil? and server.state == session[:admp_state]
      response = Net::HTTP.post_form URI(server.url + '/token'),
                                      {
                                        :grant_type    => 'authorization_code',
                                        :client_id     => server.client_id,
                                        :client_secret => server.client_secret,
                                        :code          => params.require('code'),
                                      }

      if response.is_a?(Net::HTTPSuccess)
        response = JSON.parse(response.body)

        if response.key? 'access_token'
          session.delete :admp_state
          server.unset(:state)

          session[:admp_server_url] = server.url
          session[:admp_tasks_collection] = server.tasks_collection
          session[:admp_access_token] = response['access_token']

          redirect_to root_path
        else
          client.destroy

          # TODO implement error view
          raise 'Server request did not return access_token'
        end

      else
        client.destroy

        # TODO implement error view
        raise 'Server request did not complete successfuly'
      end
    else
      # TODO implement error view
      raise 'State argument is invalid for this session'
    end
  end
end
