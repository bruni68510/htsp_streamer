ENV['RACK_ENV'] = 'test'

$: << "./routes"

require './helpers'
require 'rtmp'
require 'test/unit'
require 'rack/test'
require 'json'
require 'highline/import'


class RTMPTest < Test::Unit::TestCase
  include Rack::Test::Methods

  def app
    RTMPRoute
  end

  def test1_it_connect
  
    $USERNAME = ask("Username:  ") 
    $PASSWORD = ask("Password:  ") { |q| q.echo = "*" }
    $HOST = ask("Host:  ") 
    $ID = "0"

  
    post '/connect', :use_key => false, :username => $USERNAME, :password => $PASSWORD, :host => $HOST 
    
    assert last_response.ok?, "Response not ok" + last_response.inspect
    response = JSON.parse(last_response.body)    
    assert response["success"], "sucess = false " + response.inspect
    $ID = response['id']
  end
  
  def test2_it_status
  
    get '/status/' + $ID

    assert last_response.ok?, "Response not ok " + last_response.inspect
    response = JSON.parse(last_response.body)
    
    assert response["success"], "success = false " + response.inspect
    assert response["data"].has_key?("installed"), "No installed key in response"
    assert response["data"].has_key?("running"), "No running key in response"  
  
  end
  
  
  def test4_it_install
  
    post '/install/' + $ID, :version => "i686-Ubuntu_12.04"
    
    assert last_response.ok?, "Response not ok " + last_response.inspect
    
    response = JSON.parse(last_response.body)
    
    assert response["success"], "success = false " + response.inspect 
    
  end
  
  
end
