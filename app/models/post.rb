class Post < ActiveRecord::Base
  belongs_to :user
  validates :title, :body, :user_id, presence: true
  mount_uploader :image, PostImageUploader
end
