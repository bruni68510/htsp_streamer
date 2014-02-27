require 'socket'
require 'digest/sha1'
require 'htsp/message'

module HTSP
  class Client
    attr_reader :auth

    def initialize(socket, name)
      @socket = socket
      @name = name
      @seq = 0
    end

    def hello
      args = {
        :htspversion => 6,
        :clientname => @name,
      }
      deliver(:hello, args)
      response = receive
      @auth = response.params['challenge']
      response
    end

    def authenticate(username, password)
      @username = username
      if password
        @digest = HTSP::HMF_Bin.new(htsp_digest(password, @auth))
      end

      deliver(:authenticate)
      response = receive
      raise 'Authentication failed!' if response.params['noaccess']
    end

    def get_sys_time
      deliver(:getSysTime)
      receive
    end

    def events
      deliver(:getEvents)
      receive
    end

    def query_events(title)
      args = {:query => title, :full => 1}
      deliver(:epgQuery, args)
      receive
    end

    def get_epg_object(object_id)
      deliver(:getEpgObject, :id => object_id)
      receive
    end

    def getTicket(channel_id)
      deliver(:getTicket, :channelId => channel_id)
      receive
    end

    def get_disk_space
      deliver(:getDiskSpace)
      receive
    end

    def enable_async_metadata
      deliver(:enableAsyncMetadata)
    end

    def stream(end_message)
      loop do
        message = receive
        yield message
        break if (message.params["method"] and message.params["method"] == end_message)
      end
    end
    
    

    protected

    def deliver(msg, args = {})
      @seq = @seq + 1
      args.merge!({
        :method => msg.to_s,
        :seq => @seq
      })

      if @username
        args[:username] = @username
      end
      if @digest
        args[:digest] = @digest
      end

      message = Message.new(args)
      @socket.write message.serialize
    end

    def receive
      num_bytes = bin2int(@socket.readpartial(4))
      data = ''
      while data.length < num_bytes
        data << @socket.readpartial(num_bytes - data.length)
      end
      msg = Message.new.load_raw(data)
      msg
    end

    def close
      @socket.close
    end

    def bin2int(d)
      (d[0].ord << 24) +
        (d[1].ord << 16) +
        (d[2].ord << 8) +
        d[3].ord
    end

    def htsp_digest(password, challenge)
      Digest::SHA1.digest(password+challenge)
    end
    
  end
end