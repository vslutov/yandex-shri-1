#!/usr/bin/env bash

find ./*.blocks -name '*.css' | awk '{ print "@import \"" $0 "\";" ; }' >style.css
find ./*.blocks -name '*.ts' # | awk '{ print "@import \"" $0 "\";" ; }' >style.css
