# encoding: utf-8

class PostImageUploader < CarrierWave::Uploader::Base
  storage :ftp

end
