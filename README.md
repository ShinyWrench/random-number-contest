# random-number-contest

Use this example bash command to start many player instances with pm2:

$ for name in {1..10}; do pm2 start player.js --name $name; done
