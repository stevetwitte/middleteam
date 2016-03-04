CarrierWave.configure do |config|
  config.ftp_host = ENV['FTP_HOST']
  config.ftp_port = 21
  config.ftp_user = ENV['FTP_USERNAME']
  config.ftp_passwd = ENV['FTP_PASSWORD']
  config.ftp_folder = ""
  config.ftp_url = ENV['FTP_URL']
  config.ftp_passive = true # false by default
end