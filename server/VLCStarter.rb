#!/usr/bin/ruby

require "open3"
require "launchy"

class VLCStarter

  attr_reader :executable, :input, :output, :error, :thread, :error_str

  def initialize(password)
    case Launchy::Application.new.host_os_family
      when Launchy::Detect::HostOsFamily::Windows
        @executable = "C:\\Program Files\\VLC\\vlc.exe"        
      when Launchy::Detect::HostOsFamily::Nix
        @executable = "/usr/bin/vlc"
      when Launchy::Detect::HostOsFamily::Darwin
        @executable = "/Applications/VLC.app/Contents/MacOS/VLC"
      when Launchy::Detect::HostOsFamily::Cygwin
        @executable = "/cygdrive/c/Program Files/VLC/vlc.exe"
    end

    
    @input, @output, @error, @thread = Open3.popen3(@executable + " -I telnet -vv --telnet-password " + password + " --vlm-conf ../data/vlm.conf " )

  end
  
  def bufferize_error    
    
    @error_str = Array.new    

    t = Thread.start do
      begin
        while @thread.alive?
          @error_str << @error.readline          
          sleep 0.1
        end
      rescue Exception => err
        puts err
      end
    
    end
  end
  
  def shutdown
    @output.close
    Process.kill "TERM", @thread.pid
  end     

  
end

 
if __FILE__ == $0
    vlc_starter = VLCStarter.new(ARGV[0])
    
    vlc_starter.bufferize_error    

    sleep 10
    
    puts vlc_starter.error_str
    
     vlc_starter.shutdown
end
    
    