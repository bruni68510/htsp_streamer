require 'sinatra'
require 'sinatra/streaming'
require 'json'
require 'net/ssh'
require 'net/scp'

class RTMPRoute < Sinatra::Base

  @@ssh_server = {}  
  @@crtmp_name = "crtmpserver-1.1_beta"

  helpers Sinatra::Streaming
  helpers Helpers
  
  def ssh_connect(ssh_server)
     
    if (ssh_server[:use_key] == "on")     
      Net::SSH.start(ssh_server[:host], ssh_server[:username], :key_data => ssh_server[:key], :keys_only => TRUE, :port => ssh_server[:port], :passphrase => ssh_server[:password] )
    else    
      Net::SSH.start(ssh_server[:host], ssh_server[:username], :password => ssh_server[:password], :port => ssh_server[:port] )      
    end
  end
  
  post '/connect' do    

    content_type :json  

    begin

      id = SecureRandom.uuid
      
      local_port = Random.rand(10000...20000)
         
      @@ssh_server[id] = { 
        :host =>  params['host'], 
        :username => params['username'], 
        :key => params['key'], 
        :use_key => params['use_key'], 
        :password => params['password'],
        :port => params['port'],
        :local_port => local_port
      }

      ssh = ssh_connect(@@ssh_server[id])
            
      ssh.exec!("mkdir bin")
      ssh.close
                           
      send_success({ :id => id, :local_port => local_port })
      
    rescue Exception => err    
      send_error({ :message => "Error on connect : " + err.to_s })  
    end     
     
  end
    
  get '/status/:id' do |id|
  
    content_type :json
    
    if @@ssh_server[id] == nil
      return send_error ({ :message => "Not a session" })
    end

    ssh = ssh_connect(@@ssh_server[id])
    
    installed = ( ssh.exec!("ls $HOME/bin/crtmpserver | wc -l").to_i > 0 )
    running = ( ssh.exec!("pidof crtmpserver | wc -l").to_i > 0)
    
    ssh.close
    
    send_success ({ :data => { :installed => installed, :running => running }})
  
  end
  
  post '/disconnect/:id' do |id|
  
    content_type :json
    
    if @@ssh_server[id] == nil
      return send_error ({ :message => "Not a session" })
    end
    
    @@ssh_server[id] = nil
        
    send_success
  
  end
  
  post '/install/:id' do |id|
  
    content_type :json
        
    if @@ssh_server[id] == nil
      return send_error ({ :message => "Not a session" })
    end

    if not params.has_key? "version"
      return send_error ({ :message => "No parameter version given" })
    end
    
    ssh = ssh_connect(@@ssh_server[id])
    ssh.scp().upload!("contrib/installer.sh", "installer.sh")
     
    exec_response = ssh_exec!(ssh, "$HOME/installer.sh " + @@crtmp_name + " " + params["version"]) 
     
    if exec_response[2] != 0 
       return send_error ({ :message => exec_response[1]  })
    end
        
    ssh.close
        
    send_success  ({ :message => exec_response[0]  })
  
  end
  
  get '/run/:id', provides: 'text/event-stream'  do |id|
  
    if @@ssh_server[id] == nil
      return 
    end
  
    ssh = ssh_connect(@@ssh_server[id])
    local_port = @@ssh_server[id][:local_port]
  
    ssh.forward.local(local_port,"localhost",6666)
  
    stream(:keep_open) do |out|
    
      out << ": hello\n\n" unless out.closed?

      ssh.scp().upload!("contrib/config.lua", "config.lua")
    
      ssh.exec!("killall crtmpserver")
    
      ssh.open_channel do |channel|

        channel.on_open_failed do
          msg = "program could not be started"                 
          out << "data: " + msg + "\n\n"          
          puts msg
        end
        
        channel.on_data do |ch,data|
          out << "data: " + data + "\n\n" unless out.closed?                     
        end
        
        channel.on_close do
          puts "program terminated"
        end
       
        channel.request_pty 
        channel.exec "$HOME/bin/crtmpserver $HOME/config.lua"
        
      end
      
      ssh.loop(0.2) do                              
        out << ":heartbeat \n\n" unless out.closed?
        not out.closed        
      end
      
      ssh.exec!("killall crtmpserver")
      ssh.forward.cancel_local(local_port)
      ssh.close
                                    
    end
    
    puts "stop crtmpserver"
    
  end
  
end
