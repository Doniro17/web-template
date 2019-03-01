# TT Developers School project template

This repo contains the template of the project for TT Developers School 2018.
If you are a student of the school - please replace the content of this file with your project info.

## Requirements:
1. Node v12.x
2. NPM v6.x

## How to install requirements:
1. npm install
2. cd ./frontend && npm install

## How to run app:
1. npm start

## Repo contains:
1. docker-compose file with postgres db. You can change db_user and db_password in docker-compose.yml file.

## How to use Docker:
* npm run docker-build: to download images if it's still not exist
* npm run docker-start: start postgres within docker containers
* npm run docker-clean: turn containers off.

# DB commands
## Make a dump
`docker-compose exec db sh -c 'exec pg_dump -U postgres lntsunday > /backup/dump.sql'`

## Restore from the dump
`docker-compose exec db sh -c 'exec psql -U postgres lntsunday < /backup/dump.sql'`

# Useful commands
## Clean all docker containers info
`docker-compose stop && docker-compose down --rmi local --volumes --remove-orphans`


# TODOs
## LOGS
1. Is there a lecture about log levels?
2. Add logs for Node.js Lecture?
3. **Bunyan** is not used anymore!
