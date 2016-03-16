class ApplicationController < ActionController::API
  include ::ActionController::Serialization
  respond_to :json

  def index
    render file: index.html
  end
end
