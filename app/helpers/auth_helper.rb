module AuthHelper
  def logged_in?
    !current_user.nil?
  end

  def login(user)
    reset_session
    session[:user_id] = user.id
    cookies.encrypted[:user_id] = user.id
  end

  def logout
    session.delete :user_id
    cookies.delete :user_id
    @current_user = nil
  end

  def current_user
    if defined? @current_user
      @current_user
    elsif session[:user_id]
      @current_user = User.find(session[:user_id])
    else
      @current_user = nil
    end
  end
end
