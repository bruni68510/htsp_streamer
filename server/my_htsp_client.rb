#!/usr/bin/ruby

require "pp"

$LOAD_PATH.unshift File.expand_path('./htsp-ruby/lib')
$LOAD_PATH.unshift File.expand_path('./streamio-ffmpeg/lib')

require 'htsp/client.rb'
require 'streamio-ffmpeg'
require 'uri/http'

class MyHTSPClient

  attr_reader :channels

  PORT = 9982

  def initialize(host, username, password)    
    @channels = []
    @username = username
    @password = password     
    @host = host
    
  end

  def get_channels()    
    connect if @client == nil
    @client.enable_async_metadata
    @client.stream "initialSyncCompleted" do |message|             
      if message.params["method"] == "channelAdd"
        
          channel_number = message.params["channelNumber"]
        
          if channel_number == 0 
            channel_number = 100
          end 
      
          @channels << { 
            :channelNumber => channel_number, 
            :channelId => message.params["channelId"],
            :channelName => message.params["channelName"].force_encoding("utf-8")
          }  
      end           
   end
   @client = nil
   @channels
  end
  
  def get_ticket(channelId)
    connect if @client == nil
    @client.getTicket channelId    
  end

  def connect 
    @socket = TCPSocket.new @host, PORT
    @client = HTSP::Client.new @socket, "VLCStreamer"    
    @client.hello
    @client.authenticate @username, @password
  end

  def transcode(channelId, target, ffmpeg_path, video_codec, video_bitrate, audio_codec, audio_bitrate)
  
    ticket = get_ticket(channelId)
    
    channel_url = ::URI::HTTP.build({
      :host => @host,
      :userinfo => @username + ":" + @password,
      :port => PORT - 1,
      :path => ticket.params['path'],
      :query => "ticket=" + ticket.params['ticket']
    }).to_s 
    
    options = {
    
      audio_codec: audio_codec, audio_bitrate: audio_bitrate,
      video_codec: video_codec, video_bitrate: video_bitrate, 
      custom: "-ar 44100 -aspect 1.77 -s 480x270 -f flv -strict -2 -metadata streamName=stream"
    }
    
  
    puts options.inspect
       
    movie = FFMPEG::Movie::new(channel_url)
  
    movie.transcode(target, options) do |msg|
      yield msg if block_given?
    end
  
  end
 
 
end

if __FILE__ == $0   
    client = MyHTSPClient.new "192.168.0.34", "cbrunner", "zause1gt"
    
    #
    pp client.get_channels
    
    pp client.get_ticket 14
    
    
end
 