Read the Project Specfications [here](https://docs.google.com/document/d/1zZjNk9cbNLz0mp_-YtyZxhMzUph97fVgCkSE4u2k5EA/edit?usp=sharing).

Add design docs in *images/*

## Instructions to setup and run project

React App: localhost:3000
Server: localhost:8000
Database: mongodb://127.0.0.1:27017/fake_so

Startup:
Open terminal and run:
mongod.exe --dbpath="c:\data\db"

Open terminal -> cd to final-project folder and run:
SECRET_KEY=<secret string> nodemon server/server.js
Example: SECRET_KEY="secret string" nodemon server/server.js

Open terminal -> cd to final-project/client/src folder and run:
npm start

## Design Patterns

## Miscellaneous

- Deleting Questions deletes all associated answers and comments as well as tags that aren't used by other questions
- Deleting Answers deletes all associated comments
- Deleting Tags may leave some questions to be tagless
