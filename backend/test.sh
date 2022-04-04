sudo apt-get update
sudo apt-get -y install curl dirmngr apt-transport-https lsb-release ca-certificates vim
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get -y install nodejs
sudo apt-get install mongodb
npm i -g nodemon
npm i -g forever
git clone https://github.com/fdmxfarhan/water-rights.git
cd sibche-commute
forever start index.js

git pull
pkill node
forever start index.js

mongodump
mongorestore dump/

