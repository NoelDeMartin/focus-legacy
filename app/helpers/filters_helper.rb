module FiltersHelper
  def authenticate!
    unless session.key? :admp_access_token
      redirect_to login_path
    end
  end

  def secure!
    unless !Rails.env.production? || request.ssl?
      render 'unsecure'
    end
  end
end
