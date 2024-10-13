# This is a test architecture

### Start up-
Open a terminal in the directory of the docker-compose file and run command "docker-compose up --build".
See API running in URL "http://localhost/v1/app-a/api1" 

### It has -
1. 2 Nodejs Services where can 1 can talk to the other.
2. There is a redis service which is accessible by the nodejs app.
3. There is an nginx service which forwards the API requests to the nodejs apps. Direct API requests to the apps are not possible unless it's configuration is changed.
4. One of the nodejs apps is also connected with the local MYSQL DB.

### Notes -
1. The .env variables can also be written in the Docker compose file as part of the 'environment' section. The variable in Docker compose file takes precedence for .env.
2. To make the app accessible to the outside, change Port from "8081" to "8081:8081" in docker compose.
