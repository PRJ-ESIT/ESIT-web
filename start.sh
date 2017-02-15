#!/bin/bash

ENVIRONMENT_TYPE=development

NODE_ENV=$ENVIRONMENT_TYPE ./node_modules/.bin/nodemon app.js
