#!/usr/bin/env bash
find . -name '*.css' | awk '{ if ($0 != "./style.css") print "@import \"" $0 "\";" ; }' >./style.css