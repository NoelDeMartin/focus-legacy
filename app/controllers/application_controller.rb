class ApplicationController < ActionController::Base
  include FiltersHelper

  before_action :authenticate!
  protect_from_forgery with: :exception
end
