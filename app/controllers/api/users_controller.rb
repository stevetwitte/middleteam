module Api
  class UsersController < BaseController
    skip_before_filter :authenticate, :only => [:create]

    def create
      begin
        unless params['secret_code'] == ENV['SECRET_CODE']
          logger.warn('validation error: wrong secret code!')
          render status: :bad_request, json: { error: 'Wrong Secret Code!' }
          return
        end

        if User.find_by(email: user_params[:email])
          render status: :bad_request, json: { error: 'An account has already been created with that email address.'}
          return
        end
        
        user = User.new(email: user_params[:email], password: user_params[:password], password_confirmation: user_params[:password_confirmation], username: user_params[:username])
        
        if user.save
          render status: :ok, json: { user: UserSerializer.new(user), token: user.authentication_token }
          return
        else
          logger.warn('validation error: user creation with params')
          render status: :bad_request, json: { error: 'Validation Error' }
          return
        end
      rescue StandardError => e
        logger.error(e.message)
        render status: :internal_server_error, json: { error: 'Internal Error' }
        return
      end
    end

    def info
      begin
        if @user.nil?
          render status: :bad_request, json: { error: 'No User' }
          return
        end

        render status: :ok, json: UserSerializer.new(@user)
        return
      rescue StandardError => e
        logger.error(e.message)
        render status: :internal_server_error, json: { error: 'Internal Error' }
        return
      end
    end
    
    private
    
    def user_params
      params.permit(:email, :username, :password, :password_confirmation, :secret_code)
    end

  end
end