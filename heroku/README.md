# Heroku

## Import Postgres database from Heroku for local development

Assuming the heroku app is `myapp` and database name is `myapp_db`:

#### The easy way

```sh
heroku pg:pull database_url myapp_db --app myapp
```

But it's extremely slow even on a moderate-sized production database because *it's pulling by row of records*

#### The fast way

```
dropdb myapp_db
heroku pg:backups:capture -a myapp
heroku pg:backups:download -a myapp
createdb myapp_db
pg_restore --verbose --clean --no-acl --no-owner -h localhost -d myapp_db latest.dump
```
