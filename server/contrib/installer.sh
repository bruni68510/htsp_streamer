#!/bin/bash

function do_error {
    echo $1;
    exit $2;
}

function download {
    rm 1.tar.gz
    wget -O 1.tar.gz http://www.rtmpd.com/assets/binaries/784/$1-$2.tar.gz
    code=$?

    if [ $code -ne 0 ]; then
        do_error "unable to download file" 2
    fi
}

function uncompress {
    tar zxvf 1.tar.gz
    mkdir $HOME/bin
    cp $1-$2/crtmpserver $HOME/bin

    code=$? 

    if [ $code -ne 0 ]; then
        do_error "unable to uncompress file" 3
    fi
}

function cleanup {
    rm 1.tar.gz
    rm -rf $1-$2
}

if [ "$2" = "" ]; then
    do_error "No parameter given"
fi

download $1 $2
uncompress $1 $2
cleanup $1 $2

