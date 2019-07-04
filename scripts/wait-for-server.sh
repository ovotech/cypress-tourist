#! /usr/bin/env sh

echo "Wait for server"
while true; do
  curl -f http://localhost:3000 > /dev/null 2> /dev/null
  if [ $? = 0 ]; then
    echo "Server started"
    break
  fi

  sleep 2
done
