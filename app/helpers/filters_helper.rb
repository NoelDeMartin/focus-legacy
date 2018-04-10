module FiltersHelper
  def authenticate!
    unless logged_in?
      redirect_to login_path
    end
  end

  def secure!
    unless !Rails.env.production? || request.ssl?
      render 'unsecure'
    end
  end
end
