# Installation
```
npm i
```

# Config
Server expects MongoDB database named `todo` by default  
Config file located in `./config/app.js`

# Migration
If you want to seed DB with dummy data, you can use migration.  
Install Mongoose migration lib globally
```
npm i mongoose-data-migrate -g
```

Configuration located in `./config/migrations.js`  
Migration located in `./migrations`

Migrate:
```
mongoose-data-migrate up
```
Rollback:
```
mongoose-data-migrate down
```

# Dev environment
Run `gulp` command to watch JS and SCSS changes

# Server
Run `node app.js` to start Node server

# URLs
Application:
```
http://localhost:2017
```
API docs:
```
http://localhost:2017/api/docs
```
