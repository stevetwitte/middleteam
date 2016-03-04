module Api
  class PostsController < BaseController

    def index
      begin
        offset = post_params[:page].to_i * 10
        posts = Post.all.order(created_at: :desc).offset(offset).limit(10)

        render status: :ok, json: posts, each_serializer: PostSerializer
      rescue StandardError => e
        logger.error(e.message)
        render status: :internal_server_error, json: { error: 'Internal Error' }
        return
      end 
    end

    def create
      begin
        post = Post.new(user: @user, title: post_params[:title], body: post_params[:body], image: post_params[:file])

        if post.save
          render status: :ok, json: PostSerializer.new(post)
          return
        else
          logger.warn('validation error on post creation.')
          render status: :bad_request, json: { error: 'Validation Error' }
          return
        end

      rescue StandardError => e
        logger.error(e.message)
        render status: :internal_server_error, json: { error: 'Internal Error' }
        return
      end
    end

    private
    
    def post_params
      params.permit(:title, :body, :image, :page, :file)
    end

  end
end