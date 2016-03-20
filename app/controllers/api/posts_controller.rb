module Api
  class PostsController < BaseController

    # Index endpoint returns an array of objects based on the page params
    # GET /api/posts
    def index
      begin
        offset = post_params[:page].to_i * 10
        posts = Post.all.order(created_at: :desc).offset(offset).limit(10)

        render status: :ok, json: posts, each_serializer: PostSummarySerializer
      rescue StandardError => e
        logger.error(e.message)
        render status: :internal_server_error, json: { error: 'Internal Error' }
        return
      end
    end

    # Show action returns a single post and its comments
    # GET /api/post/:id
    def show
      begin
        post = Post.find(post_params[:id])

        if post
          render status: :ok, json: PostSerializer.new(post)
          return
        else
          render status: :bad_request, json: { error: "Could not find post with id " + post_params[:id] }
          return
        end
      rescue StandardError => e
        logger.error(e.message)
        render status: :internal_server_error, json: { error: 'Internal Error' }
        return
      end
    end

    # Create endpoint creates a new post for a logged in user
    # POST /api/post
    # BODY: Title, Body, Image
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
      params.permit(:id, :title, :body, :image, :page, :file)
    end

  end
end