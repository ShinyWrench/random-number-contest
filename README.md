# random-number-contest

This is a simple Redis scoreboard demo.

Use this example bash command to start many (10) player instances with pm2:

$ for name in {1..10}; do pm2 start player.js --name $name; done
