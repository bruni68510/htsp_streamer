# htsp_streamer / vlc_streamer

The goal of this application is to send the dvb-t streams from TV Headend to the internet
using a DSL line connection.

The DSL line is restricted in upload, so the stream need to be transcoded prior that he can be sent on the internet.

The application contains three blocks:

  - A Web frontend written in extjs.
  - A backend server written in ruby.
  - An external streaming server where crtmpserver will be installed.
  
# Components.
## Ruby backend

The ruby backend connects the an external streaming server using ssh. Over this connection, the server will install
crtmpserver and start/stop it.

The streaming server is supposed to be external of our internal dsl network.

The ruby backend will push to transcoded stream to this server, and the web frontend will access the stream using the rtmp protocol.

## Web frontend

The web frontend should be installed on the local dsl network. The router should be configured to forward to port where the web frontend is running.

This is typically port 3000, if you use the thin web server.

The web frontend shows a menu with:
   - RTMP Control.
   - HTS Control.
   - Player Control

With the RTMP Control, you will control the external streaming server using a ssh connection from the ruby backend.
With the HTS control, you will get a list of available streams on your internal HTS Server.
With the Player, you can show the RMTP Stream in the flash player.

## External streaming server.

The external streaming erver should be accessible from the ruby backend over ssh. The install action will download crtmpserver from http://www.rtmpd.com/ and install it in the bin folder under $HOME.

# Requirements
## Ruby backend
Following gem need to be present: sinatra, sinatra-streaming, json, net-ssh ...

# Running
The program will be started with following command line:

from the server directory:
thin -R config.ru start
