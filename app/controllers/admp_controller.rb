class AdmpController < ApplicationController
  def registered
    # TODO Use state param to validate request
    render json: {redirect_uri: admp_authorized_url}
  end

  def authorized
    # TODO Use state param to validate request
    # TODO retrieve token using code
    render plain: 'Login successful'
  end
end