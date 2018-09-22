module ViewHelper
  def auth_server
    Admp::Server::find(session[:auth])
  end
end
