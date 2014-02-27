configuration=
{
    daemon=false,
    pathSeparator="/",

    logAppenders=
    {
        {
            name="console appender",
            type="console",
            level=6
        }
    },
    
    applications=
    {
        rootDirectory="applications",
        {
            description="FLV Playback Sample",
            name="flvplayback",
            protocol="dynamiclinklibrary",
            default=true,
            aliases=
            {
                "simpleLive",
                "vod",
                "live",
                "WeeklyQuest",
                "SOSample",
                "oflaDemo",
            },
            acceptors = 
            {
                {
                    ip="0.0.0.0",
                    port=1935,
                    protocol="inboundRtmp"
                },
                {
                    ip="127.0.0.1",
                    port=6666,
                    protocol="inboundLiveFlv",
                    waitForMetadata=true
                }
            },
            externalStreams = 
            {
                --[[{
                    uri="rtmp://edge01.fms.dutchview.nl/botr/bunny",
                    localStreamName="test1",
                    tcUrl="rtmp://edge01.fms.dutchview.nl/botr/bunny", --this one is usually required and should have the same value as the uri
                }]]--
            },
            validateHandshake=false,
            keyframeSeek=true,
            seekGranularity=1.5, --in seconds, between 0.1 and 600
            clientSideBuffer=12, --in seconds, between 5 and 30
            mediaFolder="./media"
        }
    }
}
