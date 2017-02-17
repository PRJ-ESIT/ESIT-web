#!/bin/bash
#This script catches 3 different options: production, development, ios.
#It defaults to development if there is no option passed.


if [ "$1" == "ios" ]; then
  ./node_modules/.bin/webpack --config config/webpack.production.config.js
  cp ./dist/bundle.js ./ios/www/js/bundle.js
else
  if [ "$1" == "production" ]; then
    ENVIRONMENT_TYPE=production
    ./node_modules/.bin/webpack --config config/webpack.production.config.js
    NODE_ENV=$ENVIRONMENT_TYPE ./node_modules/.bin/nodemon app.js
  else
    ENVIRONMENT_TYPE=development
    NODE_ENV=$ENVIRONMENT_TYPE ./node_modules/.bin/nodemon app.js
  fi
fi
