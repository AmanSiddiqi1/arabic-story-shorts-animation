#!/bin/sh
# usage: sbs.sh <original.mp4> <new.mp4> <out.mp4>   side-by-side (original left, new right), 540x960 each, with the new film's audio
ffmpeg -v error -y -i "$1" -i "$2" -filter_complex "[0:v]scale=540:960[a];[1:v]scale=540:960[b];[a][b]hstack[v]" -map "[v]" -map 1:a -c:v libx264 -crf 22 -preset veryfast -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart "$3"
