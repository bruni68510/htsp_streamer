require 'sinatra'

class MainRoute < Sinatra::Base
  set :static, true
  set :public_dir, File.dirname(__FILE__) + '../../../public'

  get '/' do
    redirect ("/index.html") 
  end

end