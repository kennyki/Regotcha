# MongoDB

| Table of Contents |
|:------------------|
| [[toc]] |

## Backup production database and restore it to development environment

#### Backup

Create a dump and compress it. You can then download it to your local machine.

```sh
mongodump -d dbname
tar zcvf dbname-backup.tgz dump
```

#### Restore

Decompress the dump and restore. You probably don't need the indexes.

```sh
tar xvzf dbname-backup.tgz
mongorestore db-backup --noIndexRestore
```

## Auto-backup production database to git repository

I have a mongo database sitting in a digital ocean droplet. It needs backup automatically on daily basis and the backup files should be stored safely.

#### 1. Create a private git repository for the backups

[Bitbucket](https://bitbucket.org) is an excellent choice unless you're on paid plan on [GitHub](https://github.com).

#### 2. Add a public SSH key of the digital ocean droplet to the repository

It is more secured and remove the need to enter password when doing git operations. [Read more about the steps](https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/).

#### 3. Add a shell script to create backup and commit to the repository

SSH into the digital ocean droplet and CD to the deployment folder of the project.

Create a script, i.e. `/opt/backups/backup.sh`:

```bash
MONGO_DATABASE="my-db-name"
APP_NAME="my-app-name"

MONGO_HOST="127.0.0.1"
MONGO_PORT="27017"
TIMESTAMP=`date +%F-%H%M`
MONGODUMP_PATH="/usr/bin/mongodump"
BACKUPS_DIR="/opt/backups/$APP_NAME"
BACKUP_NAME="$APP_NAME-$TIMESTAMP"

$MONGODUMP_PATH -d $MONGO_DATABASE

mkdir -p $BACKUPS_DIR
mv dump $BACKUP_NAME
tar -zcvf $BACKUPS_DIR/$BACKUP_NAME.tgz $BACKUP_NAME
rm -rf $BACKUP_NAME

cd $BACKUPS_DIR
# note: make sure the dir is setup correctly for the bitbucket repository
git add $BACKUP_NAME.tgz
git commit -m "Daily backup"
git push -u origin master
```

### 4. Add daily cron job to execute the script

```bash
crontab -e
```

The command should look like:

```bash
# m h  dom mon dow   command
# Everyday at 1 a.m.
00 01 * * * /bin/bash /opt/backups/backup.sh
```
