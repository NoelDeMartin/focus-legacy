class ApplicationController < ActionController::Base
  include AuthHelper
  include FiltersHelper

  before_action :authenticate!
  protect_from_forgery with: :exception
end
