require 'sinatra'

class ConfigRoute < Sinatra::Base

  get '/' do
    send_file File.join(File.dirname(__FILE__), '../../public' , 'static', 'config.json')  
  end

end