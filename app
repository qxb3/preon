#!/bin/bash

command=$1

if [ -z $1 ]; then
  echo "
  Choose one of the commands:
  start, dev, lint

  Example: ./app start
  "
fi

case $command in
  start)
    concurrently "yarn server:start" "yarn client:start" \
      --names "SERVER,CLIENT" \
      --prefix "[{name}]" \
      --prefix-colors "bgBlue.bold,bgMagenta.bold" \
      --kill-others-on-fail
  ;;

  dev)
    concurrently "yarn server:dev" "yarn client:dev" \
      --names "SERVER,CLIENT" \
      --prefix "[{name}]" \
      --prefix-colors "bgBlue.bold,bgMagenta.bold" \
      --kill-others-on-fail
  ;;

  lint)
    concurrently "yarn server:lint" \
      --names "SERVER,CLIENT" \
      --prefix "[{name}]" \
      --prefix-colors "bgBlue.bold,bgMagenta.bold"
  ;;
esac
