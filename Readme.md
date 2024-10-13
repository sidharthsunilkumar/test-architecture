### This is a test archtecture

# Start up-
Open a terminal in the directory of the docker compose file and run command "docker-compose up --build".
See API running in url "http://localhost/v1/app-a/api1" 

# It has -
1. 2 Nodejs Services which can 1 can talk to the other.
2. There is a redis service is is accessible by the nodejs app.
3. There is an nginx service which forwards the API requests to the app. Direct API requests to the apps are not possible.
4. A nodejs app is also connected with the local MYSQL DB.

# Notes -
1. The .env variables can also be written in the Docker compose file as part of the 'environment' section. The variable in Docker compose file takes precedence for .env.
2. To make an app accessible to outside, chnage Port from "8081" to "8081:8081" in docker compose.
