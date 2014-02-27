require 'sinatra'
require 'sinatra/streaming'
require 'streamio-ffmpeg'
require 'uri/http'
require 'json'


class HTSRoute < Sinatra::Base

  @@htsp_client = {}

  helpers Sinatra::Streaming
  helpers Helpers
  
  def get_htsp_client(params)
    MyHTSPClient.new params[:server], params[:username], params[:password]  
  end
  
  post '/connect' do    

    content_type :json  

    begin
      
      id = SecureRandom.uuid
        
      @@htsp_client[id] = { 
        :server => params['server'], 
        :username => params['username'], 
        :password => params["password"],
        :ffmpeg_path => params["ffmpeg_path"],
        :video_codec =>  params["video_codec"],
        :video_bitrate =>  params["video_bitrate"],
        :audio_codec =>  params["audio_codec"],
        :audio_bitrate =>  params["audio_bitrate"]
     } 
      
      htsp_client = get_htsp_client(@@htsp_client[id])          
      htsp_client.connect
            
      { :success => true, :id => id }.to_json
    rescue Exception => e
      { :success => false, :message => "Unable to connect:" + e.to_s }.to_json  
    end     
     
  end
  
  post '/disconnect/:id' do |id|
  
    content_type :json
    
    if @@htsp_client[id] == nil
      return { :success => false, :message => "Not connected" }.to_json
    end
    
    @@htsp_client[id] = nil
        
    send_success
  
  end
  
  get '/channels/:id' do |id|
    
    content_type :json
    
    if @@htsp_client[id] == nil
      return { :success => false, :message => "Not connected" }.to_json
    end
  
    htsp_client = get_htsp_client(@@htsp_client[id])
    
    { :success => true, :data => htsp_client.get_channels() }.to_json
  end
  
  get '/transcode/:id/:channelId/:local_port', provides: 'text/event-stream'  do |id,channelId,local_port|
  
  
    if @@htsp_client[id] == nil
      return 
    end
    
    puts @@htsp_client[id].inspect
    
    htsp_client = get_htsp_client(@@htsp_client[id])
  
    stream(:keep_open) do |out|
    
      out << ": hello\n\n" unless out.closed?
      
      out << "data: start transcoding \n\n" unless out.closed?
      
      t = Thread.start do |t|
        while not out.closed?
          sleep 0.5
          out << ": heartbeat\n\n" unless out.closed?
        end
      end
        
      begin 
      
        
        htsp_client.transcode(
          channelId, 
          "tcp://localhost:" + local_port, 
          @@htsp_client[id][:ffmpeg_path], 
          @@htsp_client[id][:video_codec],
          @@htsp_client[id][:video_bitrate],
          @@htsp_client[id][:audio_codec],
          @@htsp_client[id][:audio_bitrate],
        ) do |msg|
          out << "data: " + msg + " \n\n" unless out.closed?
          break if out.closed?
        end
      rescue Exception=>e
        out << "data: transcoder crashed #{e.to_s} \n\n" unless out.closed? 
      end
      
      t.exit
           
    end  
  
    puts "stop transcoding"
    
  end
  
end
