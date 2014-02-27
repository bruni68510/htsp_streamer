#!/usr/bin/ruby

require "./my_htsp_client"

require "./helpers"

require "./routes/config"
require "./routes/main"
require "./routes/hts"
require "./routes/rtmp"

# Is channel transcode startable
$IS_TRANSCODE_STARTABLE = false

# IS channel transcoding
$IS_TRANSCODE_STARTED = false

map '/' do
  run MainRoute.new
end

map '/config' do
  run ConfigRoute.new
end

map '/hts' do
  run HTSRoute.new
end

map '/rtmp' do
    run RTMPRoute.new
end