Development

1. Start SSH tunnel

ssh -i ~/Downloads/"Personal Site Key Pair".pem -L 5433:localhost:5432 ubuntu@3.143.243.28

2. nodemon server.js
3. Develop

Deploy

git push

SSH into EC2

cd personl-site
git pull
npm install (if needed)
pm2 restart "Personal Site"

Useful PM2 commands

pm2 list
pm2 logs
pm2 restart myapp
pm2 save 