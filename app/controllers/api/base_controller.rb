module Api
  class BaseController < ApplicationController
    before_filter :authenticate
    skip_before_filter :authenticate, :only => [:login]

    def authenticate
      token = request.headers['token']

      if token.blank?
        render status: :bad_request, json: { error: 'Please login again.' }
        return
      end

      begin

        @user = User.find_by(authentication_token: token)

        if @user.nil?
          render status: :bad_request, json: { error: 'Please login again.' }
          return
        end

        return
          
      rescue StandardError => e
        logger.error e.message
        render status: :internal_server_error
      end
    end

    def login
      begin
        user = User.find_by(email: login_params[:email])

        if user.nil? || !user.valid_password?(login_params[:password])
          render status: :bad_request, json: { error: 'Could not login.' }
          return
        end

        user.authentication_token = nil
        if user.save
          render status: :ok, json: { token: user.authentication_token }
          return
        else
          render status: :bad_request, json: { error: 'Could not login.' }
          return
        end
      rescue StandardError => e
        logger.error e.message
        render status: :internal_server_error
      end
    end

    private

    def login_params
      params.permit(:email, :password)
    end
  end
end