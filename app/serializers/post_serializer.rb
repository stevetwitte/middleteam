class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :author, :image_url, :display_date, :created_at, :has_image

  def author
    object.user.username
  end

  def has_image
    if object.image_url == nil
      return false
    else
      return true
    end
  end

  def display_date
    object.created_at.strftime('%m/%d/%Y at %I:%M%p')
  end
end
